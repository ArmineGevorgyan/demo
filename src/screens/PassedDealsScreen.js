import { Spinner, Icon } from "native-base";
import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { SwipeRow } from "react-native-swipe-list-view";
import GrayHeader from "../components/grayHeader";
import { colors } from "../styles/colors";
import { baseStylesheet } from "../styles/baseStylesheet";
import {
  getPassedDealsStartups,
  getMoreStartups,
  removeCard,
} from "../redux/ducks/passedDeals";
import BackgroundImageCard from "../components/backgroundImageCard";
import constants from "../constants";
import { isInvestor } from "../helpers/userTypeHelper";

class PassedDealsScreen extends Component {
  componentDidMount() {
    const {
      getPassedDealsStartups,
      navigation,
      addingToPassedDeals,
      addingToPipeline,
    } = this.props;

    navigation.addListener("focus", () => {
      if (!addingToPassedDeals && !addingToPipeline) {
        getPassedDealsStartups();
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.addingToPassedDeals && !this.props.addingToPassedDeals) ||
      (prevProps.addingToPipeline && !this.props.addingToPipeline)
    ) {
      this.props.getPassedDealsStartups();
    }
  }

  renderHiddenItem = () => {
    return (
      <View style={styles.hiddenCardContainer}>
        <View style={styles.hiddenCard}>
          <Icon type="Feather" name="star" style={styles.icon} />
          <Text style={styles.hiddenText}>
            {this.props.t("passedDeals.hiddenItemText")}
          </Text>
        </View>
      </View>
    );
  };

  renderItem = ({ item }) => {
    const removeCard = () => {
      this.props.removeCard(item.id);
    };

    return (
      <SwipeRow
        disableLeftSwipe={true}
        tension={40}
        leftOpenValue={constants.windowWidth}
        swipeToOpenPercent={30}
        onRowDidOpen={removeCard}
      >
        {this.renderHiddenItem()}
        <BackgroundImageCard
          startup={item}
          navigation={this.props.navigation}
        />
      </SwipeRow>
    );
  };

  renderCards() {
    const {
      isLoading,
      startups,
      getMoreStartups,
      loadingMore,
      nextPage,
      noMoreStartups,
      addingToPassedDeals,
      addingToPipeline,
    } = this.props;

    if (isLoading || addingToPipeline) {
      return <Spinner color={colors.secondaryColor} />;
    }

    const handleOnEndReached = ({ distanceFromEnd }) => {
      if (noMoreStartups) {
        return;
      }
      if (!addingToPassedDeals && !addingToPipeline) {
        getMoreStartups(nextPage);
      }
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
    const { user } = this.props;

    return (
      <View style={baseStylesheet.baseContainer}>
        <GrayHeader
          title="Passed Deals"
          enableSearch
          enableBell={isInvestor(user?.authorities[0])}
          backButtonHandler={this.backButtonHandler}
        />
        {this.renderCards()}
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  const startups = state.passedDeals.startups;
  const isLoading = state.passedDeals.isLoading;
  const loadingMore = state.passedDeals.loadingMore;
  const nextPage = state.passedDeals.nextPage;
  const noMoreStartups = state.passedDeals.noMoreStartups;
  const user = state.user.userData;
  const addingToPassedDeals = state.passedDeals.addingToPassedDeals;
  const addingToPipeline = state.pipeline.addingToPipeline;

  return {
    startups,
    isLoading,
    loadingMore,
    nextPage,
    noMoreStartups,
    user,
    addingToPassedDeals,
    addingToPipeline,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPassedDealsStartups: () => dispatch(getPassedDealsStartups()),
    getMoreStartups: (page) => dispatch(getMoreStartups(page)),
    removeCard: (startupId) => dispatch(removeCard(startupId)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(PassedDealsScreen);

const styles = StyleSheet.create({
  inviteButton: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 241,
    height: 50,
    borderRadius: 25,
    marginTop: 9,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    color: colors.green,
    textTransform: "uppercase",
    fontSize: 16,
    marginLeft: 9,
    fontFamily: "montserrat-bold",
    textAlign: "center",
  },
  hiddenCardContainer: {
    margin: 10,
    marginTop: 30,
    flex: 1,
  },
  hiddenCard: {
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.darkBlue,
    paddingLeft: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  icon: {
    marginLeft: 10,
    marginBottom: 10,
    color: "white",
  },
  hiddenText: {
    width: 100,
    color: "white",
    fontSize: 16,
    fontFamily: "montserrat-regular",
  },
});
