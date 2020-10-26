import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { Content, Spinner } from "native-base";
import Swiper from "react-native-deck-swiper";
import { baseStylesheet } from "../styles/baseStylesheet";
import SmallStartupCard from "../components/smallStartupCard";
import GrayHeader from "../components/grayHeader";
import SwitchSelector from "../components/switchSelector";
import {
  getNewStartups,
  addStartupToParkingLot,
  addStartupToPipeline,
} from "../redux/ducks/startup";
import { colors } from "../styles/colors";
import EmptyList from "../components/emptyList";

class DiscoverStartups extends Component {
  componentDidMount() {
    const { getNewStartups } = this.props;

    getNewStartups();
  }

  renderSwiper() {
    const { t, isLoading, startups } = this.props;

    if (!startups || isLoading) {
      return <Spinner color={colors.secondaryColor} />;
    }

    if (!isLoading && startups.length === 0) {
      return <EmptyList text={t("discoverStartups.noStartup")} />;
    }

    return (
      <Swiper
        verticalSwipe={false}
        cards={startups}
        renderCard={(card) => {
          return <SmallStartupCard startup={card} />;
        }}
        onSwipedLeft={(index) => {
          let card = startups[index];
          this.props.addStartupToParkingLot(card);
        }}
        onSwipedRight={(index) => {
          let card = startups[index];
          this.props.addStartupToPipeline(card);
        }}
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
            height: 600,
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
    addStartupToParkingLot: (startup) =>
      dispatch(addStartupToParkingLot(startup)),
    addStartupToPipeline: (startup) => dispatch(addStartupToPipeline(startup)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(DiscoverStartups);
