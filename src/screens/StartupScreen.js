import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { CollapsibleTabView } from "react-native-collapsible-tab-view";
import StartupHeader from "../components/startupHeader";
import { addStartupToPipeline } from "../redux/ducks/startup";
import { renderScene } from "../helpers/startupHelper";
import constants from "../constants";
import { colors } from "../styles/colors";

const renderHeader = (startup, goBack) => (
  <StartupHeader startup={startup} goBack={goBack} />
);

const StartupScreen = ({
  t,
  route,
  navigation,
  startups,
  addStartupToPipeline,
}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "overview", title: t("startupTab.overview") },
    { key: "product", title: t("startupTab.product") },
    { key: "market", title: t("startupTab.market") },
    { key: "team", title: t("startupTab.team") },
    { key: "discussions", title: t("startupTab.discussions") },
    { key: "faq", title: t("startupTab.faq") },
    { key: "videos", title: t("startupTab.videos") },
  ]);

  const goBack = (isFavorite) => {
    if (isFavorite) {
      addStartupToPipeline(startups[route?.params?.startup.id - 1]);
      navigation.navigate("Pipeline");
    } else {
      navigation.goBack();
    }
  };

  const handleIndexChange = (index) => {
    setIndex(index);
  };

  return (
    <CollapsibleTabView
      navigationState={{ index, routes }}
      renderScene={renderScene(route?.params?.startup)}
      onIndexChange={handleIndexChange}
      renderHeader={() => renderHeader(route?.params?.startup, goBack)}
      headerHeight={constants.startupHeaderHeight}
      tabBarProps={{
        scrollEnabled: true,
        activeColor: "#2C8EF4",
        inactiveColor: "#000",
        style: styles.tabBarStyle,
        tabStyle: {
          width: "auto",
        },
        labelStyle: {
          fontFamily: "montserrat-medium",
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
    color: "white",
    fontSize: 24,
  },
  tabBarStyle: {
    backgroundColor: "#FFF",
    shadowColor: "#FFF",
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.blueBorder,
  },
});
