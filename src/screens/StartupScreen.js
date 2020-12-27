import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Dimensions, Animated } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { TabView, TabBar } from "react-native-tab-view";
import { getStartupById } from "../redux/ducks/startup";
import {
  setPipelineLoading,
  addStartupToPipeline,
} from "../redux/ducks/pipeline";
import {
  setParkingLotLoading,
  addStartupToParkingLot,
} from "../redux/ducks/parkingLot";
import StartupHeader from "../components/startupHeader";
import SmallStartupHeader from "../components/startupSmallHeader";
import { getTabComponent } from "../helpers/startupHelper";
import constants from "../constants";
import { colors } from "../styles/colors";
import { Spinner } from "native-base";

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

const StartupScreen = ({
  t,
  route,
  navigation,
  startups,
  singleStartup,
  addStartupToPipeline,
  getStartupById,
  addStartupToParkingLot,
  setPipelineLoading,
  setParkingLotLoading,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [tabIndex, setIndex] = useState(route?.params?.initialIndex || 0);

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
    if (route.params.startup) {
      getStartupById(route.params.startup.id);
    } else {
      getStartupById(route.params.startupId);
    }
    if (route.params?.fromPipeline) {
      setIsFavorite(true);
    }
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

  const goBack = () => {
    if (isFavorite) {
      setPipelineLoading();
      addStartupToPipeline(singleStartup);
      navigation.goBack();
    } else if (route.params?.fromPipeline && !isFavorite) {
      setParkingLotLoading();
      addStartupToParkingLot(route.params.startup);
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  const renderHeader = (startup, navigation) => {
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
      <Animated.View
        style={[styles.header, { transform: [{ translateY: y }] }]}
      >
        <StartupHeader
          isFavorite={isFavorite}
          startup={startup}
          navigation={navigation}
          goBack={goBack}
          setIsFavorite={(isFavorite) => {
            setIsFavorite(isFavorite);
          }}
        />
        <Animated.View
          style={[
            { opacity: opacity },
            {
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: 100,
            },
          ]}
        >
          <SmallStartupHeader
            isFavorite={isFavorite}
            name={startup.name}
            goBack={goBack}
            setIsFavorite={(isFavorite) => {
              setIsFavorite(isFavorite);
            }}
          />
        </Animated.View>
      </Animated.View>
    );
  };

  const renderLabel = ({ route, focused }) => {
    return (
      <Text style={[styles.label, { color: focused ? "#2C8EF4" : "#000" }]}>
        {route.title}
      </Text>
    );
  };

  const renderScene = ({ route }, startup, navigation) => {
    return (
      <TabScene
        renderItem={() =>
          getTabComponent(
            route.key,
            startup,
            navigation,
            tabIndex,
            !!route.params?.startupId
          )
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
  };

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

  const renderTabView = (startup, navigation) => {
    return (
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
  };

  return (
    <View style={{ flex: 1 }}>
      {singleStartup ? (
        <>
          {renderTabView(singleStartup, navigation)}
          {renderHeader(singleStartup, navigation)}
        </>
      ) : (
        <Spinner color={colors.secondaryColor} />
      )}
    </View>
  );
};

const mapStateToProps = (state, props) => {
  const startups = state.startup.startups;
  const singleStartup = state.startup.singleStartup;

  return {
    startups,
    singleStartup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStartupToPipeline: (startup) => dispatch(addStartupToPipeline(startup)),
    getStartupById: (startupId) => dispatch(getStartupById(startupId)),
    addStartupToParkingLot: (startup) =>
      dispatch(addStartupToParkingLot(startup)),
    setPipelineLoading: () => dispatch(setPipelineLoading()),
    setParkingLotLoading: () => dispatch(setParkingLotLoading()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(StartupScreen);

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
