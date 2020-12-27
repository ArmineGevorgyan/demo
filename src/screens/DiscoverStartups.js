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
import { getNewStartups, toggleIsEmpty } from "../redux/ducks/startup";
import { addStartupToParkingLot } from "../redux/ducks/parkingLot";
import { addStartupToPipeline } from "../redux/ducks/pipeline";
import { colors } from "../styles/colors";
import EmptyList from "../components/emptyList";
import constants from "../constants";
import { isInvestor } from "../helpers/userTypeHelper";

class DiscoverStartups extends Component {
  componentDidMount() {
    const {
      getNewStartups,
      navigation,
      addingToPipeline,
      addingToParkingLot,
    } = this.props;

    navigation.addListener("focus", () => {
      setTimeout(() => {
        if (!addingToPipeline || !addingToParkingLot) {
          getNewStartups();
        }
      }, 0);
    });
  }

  swipeLeft = (index) => {
    const { startups, toggleIsEmpty } = this.props;
    let card = startups[index];
    this.props.addStartupToParkingLot(card);
    if (index === startups.length - 1) {
      toggleIsEmpty();
    }
  };

  swipeRight = (index) => {
    const { startups, toggleIsEmpty } = this.props;
    let card = startups[index];
    this.props.addStartupToPipeline(card);
    if (index === startups.length - 1) {
      toggleIsEmpty();
    }
  };

  renderSwiper() {
    const { t, isLoading, isEmpty, startups, navigation } = this.props;

    if (!startups || isLoading) {
      return <Spinner color={colors.secondaryColor} />;
    }

    if (!isLoading && (isEmpty || startups.length === 0)) {
      return <EmptyList text={t("discoverStartups.noStartup")} />;
    }

    return (
      <Swiper
        verticalSwipe={false}
        cards={startups}
        renderCard={(card) => {
          return <SmallStartupCard startup={card} navigation={navigation} />;
        }}
        onSwipedLeft={this.swipeLeft}
        onSwipedRight={this.swipeRight}
        backgroundColor={"white"}
        stackSize={4}
        stackSeparation={-25}
        stackScale={5}
        animateCardOpacity={true}
        cardVerticalMargin={30}
        cardHorizontalMargin={30}
      />
    );
  }

  render() {
    const { t, user } = this.props;
    const height = Math.max(constants.windowHeight - 210, 580);

    return (
      <Content style={{ ...baseStylesheet.baseContainer, height: "100%" }}>
        <GrayHeader
          title={t("discoverStartups.headerText")}
          enableBell={isInvestor(user?.authorities[0])}
        >
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
            height: height,
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
  const isEmpty = state.startup.isEmpty;
  const user = state.user.userData;
  const addingToPipeline = state.pipeline.addingToPipeline;
  const addingToParkingLot = state.parkingLot.addingToParkingLot;

  return {
    startups,
    isLoading,
    isEmpty,
    user,
    addingToPipeline,
    addingToParkingLot,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNewStartups: () => dispatch(getNewStartups()),
    addStartupToParkingLot: (startup) =>
      dispatch(addStartupToParkingLot(startup)),
    addStartupToPipeline: (startup) => dispatch(addStartupToPipeline(startup)),
    toggleIsEmpty: () => dispatch(toggleIsEmpty()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(DiscoverStartups);
