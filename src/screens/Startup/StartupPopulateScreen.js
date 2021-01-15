import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Dimensions, Animated } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { TabView, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import {
  createStartup,
  getEntrepreneurStartups,
  getStartupById,
  handleFieldEdit,
  handleFieldSave,
} from "../../redux/ducks/startup";
import constants from "../../constants";
import { colors } from "../../styles/colors";
import SmallStartupHeader from "../../components/startupSmallHeader";
import { getTabPopulateComponent } from "../../helpers/startupHelper";
import StartupHeaderVideoUploader from "../../components/startupHeaderVideoUploader";
import {removeToken} from '../../helpers/auth'

const TabScene = ({
  renderItem,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
}) => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <Animated.FlatList
      scrollToOverflowEnabled={true}
      numColumns={1}
      ref={onGetRef}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
          useNativeDriver: true,
        }
      )}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      contentContainerStyle={{
        paddingTop:
          constants.startupHeaderHeight + constants.startupTabBarHeight,
        minHeight: windowHeight - constants.startupTabBarHeight,
      }}
      showsHorizontalScrollIndicator={false}
      data={[0]}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => "parent" + index.toString()}
    />
  );
};

const StartupPopulateScreen = ({
  t,
  route,
  entrepreneurStartups,
  getStartupById,
  getEntrepreneurStartups,
  createStartup,
  handleFieldEdit,
  handleFieldSave,
}) => {
  const [tabIndex, setIndex] = useState(route?.params?.initialIndex || 0);

  useEffect(() => removeToken() || getEntrepreneurStartups(), []);

  const navigation = useNavigation();
  const startup = entrepreneurStartups && entrepreneurStartups[0];

  const [routes] = useState([
    { key: "overview", title: t("startupTab.overview") },
    { key: "product", title: t("startupTab.product") },
    { key: "team", title: t("startupTab.team") },
    { key: "company", title: t("startupTab.company") },
    { key: "discussions", title: t("startupTab.discussions") },
    { key: "faq", title: t("startupTab.faq") },
    { key: "videos", title: t("startupTab.videos") },
  ]);

  const scrollY = useRef(new Animated.Value(0)).current;
  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);

  useEffect(() => {
    getEntrepreneurStartups();
  }, []);

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < 200 && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= 200) {
          if (
            listOffset.current[item.key] < 200 ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: constants.startupHeaderHeight - 100,
                animated: false,
              });
              listOffset.current[item.key] =
                constants.startupHeaderHeight - 100;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  const setVideo = (video) => {
    createStartup({ demoVideoUrl: video });
  };

  const updateStartup = (key, value) => {
    handleFieldEdit(key, value, startup?.id);
    handleFieldSave(key, startup?.id);
  };

  const renderHeader = (startup) => {
    const y = scrollY.interpolate({
      inputRange: [0, 200, constants.startupHeaderHeight],
      outputRange: [0, -200, -constants.startupHeaderHeight / 1.5],
      extrapolateRight: "clamp",
    });

    const opacity = scrollY.interpolate({
      inputRange: [170, 190, 300],
      outputRange: [0, 1, 1],
      extrapolate: "clamp",
    });

    return (
      <>
        <Animated.View
          style={[styles.header, { transform: [{ translateY: y }] }]}
        >
          <StartupHeaderVideoUploader
            startup={startup}
            updateStartup={updateStartup}
            setVideo={setVideo}
          />
        </Animated.View>
        <Animated.View
          style={[
            { opacity: opacity },
            {
              position: "absolute",
              top: 0,
              width: "100%",
              height: 100,
            },
          ]}
        >
          <SmallStartupHeader startup={startup} updateStartup={updateStartup} />
        </Animated.View>
      </>
    );
  };

  const renderLabel = ({ route, focused }) => {
    return (
      <Text style={[styles.label, { color: focused ? "#2C8EF4" : "#000" }]}>
        {route.title}
      </Text>
    );
  };

  const renderScene = ({ route }, startup, navigation) => (
    <TabScene
      renderItem={() =>
        getTabPopulateComponent(route.key, startup, navigation, tabIndex)
      }
      scrollY={scrollY}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onGetRef={(ref) => {
        if (ref) {
          const found = listRefArr.current.find((e) => e.key === route.key);
          if (!found) {
            listRefArr.current.push({
              key: route.key,
              value: ref,
            });
          }
        }
      }}
    />
  );

  const renderTabBar = (props) => {
    const y = scrollY.interpolate({
      inputRange: [0, 200, constants.startupHeaderHeight],
      outputRange: [
        constants.startupHeaderHeight,
        constants.startupHeaderHeight / 3 + 0,
        100,
      ],
      extrapolateRight: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.tabContainer,
          {
            transform: [{ translateY: y }],
          },
        ]}
      >
        <TabBar
          {...props}
          scrollEnabled
          tabStyle={{ width: "auto" }}
          onTabPress={({ route, preventDefault }) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          style={styles.tab}
          renderLabel={renderLabel}
          indicatorStyle={styles.indicator}
        />
      </Animated.View>
    );
  };

  const renderTabView = (startup, navigation) => (
    <TabView
      onIndexChange={(index) => setIndex(index)}
      navigationState={{ index: tabIndex, routes }}
      renderScene={(e) => renderScene(e, startup, navigation)}
      renderTabBar={renderTabBar}
      initialLayout={{
        height: 0,
        width: Dimensions.get("window").width,
      }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      {renderTabView(startup, navigation)}
      {renderHeader(startup)}
    </View>
  );
};

const mapStateToProps = (state, props) => {
  const startups = state.startup.startups;
  const { entrepreneurStartups } = state.startup;

  return {
    startups,
    entrepreneurStartups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStartupById: (startupId) => dispatch(getStartupById(startupId)),
    getEntrepreneurStartups: () => dispatch(getEntrepreneurStartups()),
    handleFieldEdit: (key, value, startupId) =>
      dispatch(handleFieldEdit(key, value, startupId)),
    handleFieldSave: (key, startupId) =>
      dispatch(handleFieldSave(key, startupId)),
    createStartup: (data) => dispatch(createStartup(data)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(StartupPopulateScreen);

const styles = StyleSheet.create({
  header: {
    top: 0,
    height: constants.startupHeaderHeight,
    width: "100%",
    backgroundColor: "#FFF",
    position: "absolute",
  },
  label: {
    fontSize: 16,
    color: "#000",
  },
  tabContainer: {
    top: 0,
    zIndex: 1,
    position: "absolute",
    width: "100%",
  },
  tab: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: "#FFF",
    borderBottomColor: colors.disabledInput,
    borderBottomWidth: 1,
  },
  indicator: {
    backgroundColor: "#2C8EF4",
    height: 5,
  },
  icon: {
    color: "#FFF",
  },
});
