import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Spinner } from "native-base";
import { connect } from "react-redux";
import { compose } from "redux";
import { colors } from "../styles/colors";
import { withTranslation } from "react-i18next";
import {
  getUpcomingInfoSession,
  openInfoSessionModal,
} from "../redux/ducks/infoSession";
import { baseStylesheet } from "../styles/baseStylesheet";
import InfoSessionModal from "../components/infoSessionModal";

class OverviewScreen extends Component {
  componentDidMount() {
    this.props.getUpcomingInfoSession(this.props.startup?.id);
  }

  render() {
    const {
      t,
      isLoading,
      startup,
      infoSession,
      openInfoSessionModal,
    } = this.props;

    if (isLoading) {
      return <Spinner color={colors.secondaryColor} />;
    }

    return (
      <>
        <InfoSessionModal startup={startup} />
        <View style={styles.buttonView}>
          <Button
            style={[
              baseStylesheet.mainButton,
              !infoSession && styles.disabledButton,
            ]}
            onPress={openInfoSessionModal}
            disabled={!infoSession}
          >
            <Text style={baseStylesheet.mainButtonText}>
              {t("օverviewScreen.infoSession")}
            </Text>
          </Button>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const isLoading = state.infoSession.isLoading;
  const infoSession = state.infoSession.upcomingInfoSession;
  return {
    isLoading,
    infoSession,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openInfoSessionModal: () => dispatch(openInfoSessionModal()),
    getUpcomingInfoSession: (id) => dispatch(getUpcomingInfoSession(id)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(OverviewScreen);

const styles = StyleSheet.create({
  buttonView: {
    marginBottom: 25,
    width: "90%",
    alignSelf: "center",
  },
  disabledButton: {
    backgroundColor: colors.disabledText,
  },
});
