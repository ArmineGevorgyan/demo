import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { Content, Spinner } from "native-base";
import Swiper from "react-native-deck-swiper";
import { baseStylesheet } from "../styles/baseStylesheet";
import StartupCard from "../components/startupCard";
import GrayHeader from "../components/grayHeader";
import SwitchSelector from "../components/switchSelector";
import { getNewStartups } from "../redux/ducks/startup";
import { colors } from "../styles/colors";

class DiscoverStartups extends Component {
  componentDidMount() {
    const { getNewStartups } = this.props;

    getNewStartups();
  }

  renderSwiper() {
    const { isLoading, startups } = this.props;

    if (!startups || isLoading) {
      return <Spinner color={colors.secondaryColor} />;
    }

    return (
      <Swiper
        verticalSwipe={false}
        cards={startups}
        renderCard={(card) => {
          return <StartupCard startup={card} />;
        }}
        onSwipedLeft={() => {}}
        onSwipedRight={() => {}}
        backgroundColor={"white"}
        stackSize={4}
        stackSeparation={-25}
        stackScale={5}
        animateCardOpacity={true}
        cardVerticalMargin={30}
      />
    );
  }

  render() {
    const { t } = this.props;

    return (
      <Content style={{ ...baseStylesheet.baseContainer, height: "100%" }}>
        <GrayHeader title={t("discoverStartups.headerTest")}>
          <SwitchSelector
            options={[
              {
                label: t("discoverStartups.new"),
                value: false,
              },
              {
                label: t("discoverStartups.trending"),
                value: true,
              },
            ]}
          />
        </GrayHeader>
        <View
          style={{
            flex: 1,
            height: 1400,
          }}
        >
          {this.renderSwiper()}
        </View>
      </Content>
    );
  }
}

const mapStateToProps = (state, props) => {
  const startups = state.startup.startups;
  const isLoading = state.startup.isLoading;
  return { startups, isLoading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNewStartups: () => dispatch(getNewStartups()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(DiscoverStartups);
