import { Icon, Spinner } from "native-base";
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { SwipeRow } from "react-native-swipe-list-view";
import GrayHeader from "../components/grayHeader";
import SwitchSelector from "../components/switchSelector";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../styles/colors";
import { baseStylesheet } from "../styles/baseStylesheet";
import {
  getInterestedStartups,
  getMoreStartups,
  removeCard,
} from "../redux/ducks/pipeline";
import BackgroundImageCard from "../components/backgroundImageCard";
import ParkingLotIcon from "../../assets/parkingmeter.svg";
import constants from "../constants";
import { isInvestor } from "../helpers/userTypeHelper";

class PipelineScreen extends Component {
  componentDidMount() {
    const {
      getInterestedStartups,
      navigation,
      addingToPipeline,
      addingToParkingLot,
    } = this.props;

    navigation.addListener("focus", () => {
      if (!addingToPipeline && !addingToParkingLot) {
        getInterestedStartups();
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.addingToPipeline && !this.props.addingToPipeline) ||
      (prevProps.addingToParkingLot && !this.props.addingToParkingLot)
    ) {
      this.props.getInterestedStartups();
    }
  }

  renderHiddenItem = () => {
    return (
      <View style={styles.hiddenCardContainer}>
        <View style={styles.hiddenCard}>
          <ParkingLotIcon style={styles.icon} />
          <Text style={styles.hiddenText}>
            {this.props.t("pipeline.hiddenItemText")}
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
        disableRightSwipe={true}
        tension={40}
        rightOpenValue={-constants.windowWidth}
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
      t,
      isLoading,
      startups,
      getMoreStartups,
      loadingMore,
      nextPage,
      noMoreStartups,
      addingToPipeline,
      addingToParkingLot,
    } = this.props;

    if (isLoading || addingToParkingLot) {
      return <Spinner color={colors.secondaryColor} />;
    }

    const handleOnEndReached = ({ distanceFromEnd }) => {
      if (noMoreStartups) {
        return;
      }

      if (!addingToPipeline && !addingToParkingLot) {
        getMoreStartups(nextPage);
      }
    };

    const getInviteButton = () => (
      <TouchableOpacity
        style={[styles.inviteButton, baseStylesheet.elevation6]}
      >
        <Icon style={{ color: colors.green }} name="user-plus" type="Feather" />
        <Text style={styles.buttonText}>{t("pipeline.inviteStartup")}</Text>
      </TouchableOpacity>
    );

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
        ListHeaderComponent={getInviteButton}
        ListFooterComponent={getLoadingMoreSpinner}
      />
    );
  }

  render() {
    const { t, user } = this.props;

    return (
      <View style={baseStylesheet.baseContainer}>
        <GrayHeader
          title={t("pipeline.title")}
          enableBell={isInvestor(user?.authorities[0])}
        >
          <SwitchSelector
            options={[
              {
                label: t("pipeline.watchlist"),
                value: false,
              },
              {
                label: t("pipeline.committed"),
                value: true,
              },
            ]}
          />
        </GrayHeader>
        {this.renderCards()}
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  const startups = state.pipeline.startups;
  const isLoading = state.pipeline.isLoading;
  const loadingMore = state.pipeline.loadingMore;
  const nextPage = state.pipeline.nextPage;
  const noMoreStartups = state.pipeline.noMoreStartups;
  const user = state.user.userData;
  const addingToPipeline = state.pipeline.addingToPipeline;
  const addingToParkingLot = state.parkingLot.addingToParkingLot;

  return {
    startups,
    isLoading,
    loadingMore,
    nextPage,
    noMoreStartups,
    user,
    addingToPipeline,
    addingToParkingLot,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInterestedStartups: () => dispatch(getInterestedStartups()),
    getMoreStartups: (page) => dispatch(getMoreStartups(page)),
    removeCard: (startupId) => dispatch(removeCard(startupId)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(PipelineScreen);

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
    alignItems: "flex-end",
    backgroundColor: colors.darkBlue,
    paddingRight: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  icon: {
    marginRight: 20,
    marginBottom: 10,
  },
  hiddenText: {
    width: 100,
    textAlign: "right",
    color: "white",
    fontSize: 16,
    fontFamily: "montserrat-regular",
  },
});
