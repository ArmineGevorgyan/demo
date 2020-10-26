import { Spinner } from "native-base";
import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { SwipeRow } from "react-native-swipe-list-view";
import GrayHeader from "../components/grayHeader";
import { colors } from "../styles/colors";
import { baseStylesheet } from "../styles/baseStylesheet";
import {
  getParkingLotStartups,
  getMoreStartups,
  removeCard,
} from "../redux/ducks/parkingLot";
import BackgroundImageCard from "../components/backgroundImageCard";
import constants from "../constants";

class ParkingLotScreen extends Component {
  componentDidMount() {
    const { getParkingLotStartups } = this.props;

    getParkingLotStartups();
  }

  renderItem = ({ item }) => {
    const removeCard = () => {
      this.props.removeCard(item);
    };

    return (
      <SwipeRow
        disableLeftSwipe={true}
        tension={40}
        leftOpenValue={constants.windowWidth}
        swipeToOpenPercent={30}
        onRowDidOpen={removeCard}
      >
        <></>
        <BackgroundImageCard startup={item} />
      </SwipeRow>
    );
  };

  renderCards() {
    const {
      t,
      isLoading,
      startups,
      getMoreStartups,
      loadingMore,
      nextPage,
      noMoreStartups,
    } = this.props;

    if (isLoading) {
      return <Spinner color={colors.secondaryColor} />;
    }

    const handleOnEndReached = ({ distanceFromEnd }) => {
      if (noMoreStartups) {
        return;
      }

      getMoreStartups(nextPage);
    };

    const getLoadingMoreSpinner = () => {
      if (loadingMore) {
        return <Spinner color={colors.secondaryColor} />;
      }

      return <></>;
    };

    return (
      <FlatList
        data={startups}
        renderItem={this.renderItem}
        onEndReachedThreshold={0.1}
        onEndReached={handleOnEndReached}
        ListFooterComponent={getLoadingMoreSpinner}
      />
    );
  }

  backButtonHandler = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={baseStylesheet.baseContainer}>
        <GrayHeader
          title="Parking Lot"
          enableSearch
          backButtonHandler={this.backButtonHandler}
        />
        {this.renderCards()}
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  const startups = state.parkingLot.startups;
  const isLoading = state.parkingLot.isLoading;
  const loadingMore = state.parkingLot.loadingMore;
  const nextPage = state.parkingLot.nextPage;
  const noMoreStartups = state.parkingLot.noMoreStartups;
  return { startups, isLoading, loadingMore, nextPage, noMoreStartups };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getParkingLotStartups: () => dispatch(getParkingLotStartups()),
    getMoreStartups: (page) => dispatch(getMoreStartups(page)),
    removeCard: (srartup) => dispatch(removeCard(srartup)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(ParkingLotScreen);
