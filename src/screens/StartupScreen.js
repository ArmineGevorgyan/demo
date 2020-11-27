import React from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import {
  CollapsibleTabView,
  useCollapsibleScene,
} from "react-native-collapsible-tab-view";
import { SceneMap } from "react-native-tab-view";
import StartupHeader from "../components/startupHeader";
import { addStartupToPipeline, } from "../redux/ducks/startup";


const SomeRoute = ({
  routeKey,
  color,
  children
}) => {
  const scrollPropsAndRef = useCollapsibleScene(routeKey);

  return (
    <Animated.ScrollView
      style={{ backgroundColor: color }}
      {...scrollPropsAndRef}
    >
      <View style={styles.content} >
        {children}
      </View>
    </Animated.ScrollView>
  );
};

const OverviewScene = () => (
  <SomeRoute
    routeKey="overview"
    color="white"
  >
    <View style={{
      widht: 200,
      height: 500,
      // backgroundColor: "#000",
    }}>
      <Text>
        Overview Scene
      </Text>
    </View>
  </SomeRoute>
);
const ProductScene = () => (
  <SomeRoute
    routeKey="product"
    color="white"
  >
    <StartupHeader />
  </SomeRoute>
);
const MarketScene = () => <SomeRoute routeKey="market" color="white" />;
const TeamScene = () => <SomeRoute routeKey="team" color="white" />;
const DiscussionsScene = () => <SomeRoute routeKey="discussions" color="white" />;
const FaqScene = () => <SomeRoute routeKey="faq" color="white" />;
const VideosScene = () => <SomeRoute routeKey="videos" color="white" />;

const HEADER_HEIGHT = 310;

const renderHeader = (startup, goBack, addToFavourites) => (
  <StartupHeader
    startup={startup}
    goBack={goBack}
  />

);

const renderScene = SceneMap({
  overview: OverviewScene,
  product: ProductScene,
  market: MarketScene,
  team: TeamScene,
  discussions: DiscussionsScene,
  faq: FaqScene,
  videos: VideosScene,
});

const StartupScreen = ({ route, navigation, startups, addStartupToPipeline }) => {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'overview', title: 'OVERVIEW' },
    { key: 'product', title: 'PRODUCT' },
    { key: 'market', title: 'MARKET' },
    { key: 'team', title: 'TEAM' },
    { key: 'discussions', title: 'DISCUSSIONS' },
    { key: 'faq', title: 'FAQ' },
    { key: 'videos', title: 'VIDEOS' },
  ]);

  const goBack = (isFavorite) => {
    if (isFavorite) {
      addStartupToPipeline(startups[route?.params?.startup.id-1])
      navigation.navigate("Pipeline");
    } else {
      navigation.goBack();
    }
  }

  const handleIndexChange = (index) => {
    setIndex(index);
  };

  return (
    <CollapsibleTabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      renderHeader={() => renderHeader(route?.params?.startup, goBack)}
      headerHeight={HEADER_HEIGHT}
      tabBarProps={{
        scrollEnabled: true,
        activeColor: "#2C8EF4",
        inactiveColor: "#000",
        style: {
          backgroundColor: "#FFF",
          shadowColor: "#FFF",
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor:"#C7D7E6",
        },
        tabStyle: {
         width:"auto",
        },
        labelStyle: {
          fontFamily: "montserrat-light",
        },
        indicatorStyle: {
          backgroundColor: "#2C8EF4",
          height: 5,
        },
      }}
    />
  );
};

const mapStateToProps = (state, props) => {
  const startups = state.startup.startups;
  return {
    startups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStartupToPipeline: (startup) => dispatch(addStartupToPipeline(startup)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(StartupScreen);

const styles = StyleSheet.create({
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  content: {
    height: 1500,
  },
});