import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Spinner } from "native-base";
import { connect } from "react-redux";
import { compose } from "redux";
import * as WebBrowser from "expo-web-browser";
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
      user,
    } = this.props;

    const openBrowser = async (profileUrl) => {
      await WebBrowser.openBrowserAsync(profileUrl);
    };

    if (isLoading || !startup) {
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
          <Button
            style={baseStylesheet.greenFillButton}
            onPress={() =>
              openBrowser(
                `${startup.entrepreneur.availableVia}/?email=${user.email}&name=${user.firstName} ${user.lastName}`
              )
            }
          >
            <Text style={baseStylesheet.mainButtonText}>
              {t("օverviewScreen.call")}
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
  const user = state.user.userData;

  return {
    isLoading,
    infoSession,
    user,
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
