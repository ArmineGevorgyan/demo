import { Container, Content, Icon, Spinner } from "native-base";
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import GrayHeader from "../components/grayHeader";
import SwitchSelector from "../components/switchSelector";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../styles/colors";
import { baseStylesheet } from "../styles/baseStylesheet";
import {
  getInterestedStartups,
  getMoreStartups,
} from "../redux/ducks/pipeline";
import BackgroundImageCard from "../components/backgroundImageCard";

class PipelineScreen extends Component {
  componentDidMount() {
    const { getInterestedStartups } = this.props;

    getInterestedStartups();
  }

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

    const renderItem = ({ item }) => <BackgroundImageCard startup={item} />;

    const handleOnEndReached = ({ distanceFromEnd }) => {
      if (noMoreStartups) {
        return;
      }

      getMoreStartups(nextPage);
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
        renderItem={renderItem}
        onEndReachedThreshold={0.1}
        onEndReached={handleOnEndReached}
        ListHeaderComponent={getInviteButton}
        ListFooterComponent={getLoadingMoreSpinner}
      />
    );
  }

  render() {
    const { t } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <GrayHeader title={t("pipeline.title")}>
          <SwitchSelector
            options={[
              {
                label: t("pipeline.interested"),
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
  return { startups, isLoading, loadingMore, nextPage, noMoreStartups };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInterestedStartups: () => dispatch(getInterestedStartups()),
    getMoreStartups: (page) => dispatch(getMoreStartups(page)),
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
    fontWeight: "bold",
    textAlign: "center",
  },
});
