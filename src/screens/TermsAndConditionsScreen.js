import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View, Alert } from "react-native";
import { Button } from "native-base";
import { withTranslation } from "react-i18next";
import HTML from "react-native-render-html";
import { ScrollView } from "react-native-gesture-handler";
import { baseStylesheet } from "../styles/baseStylesheet";
import { acceptTermsAndConditions } from "../redux/ducks/termsAndConditions";
import DWG from "../../assets/DWG.svg";
import constants from "../constants";
import { colors } from "../styles/colors";
import Accordion from "../components/accordion";
import VideoView from "../components/videoView";

class TermsAndConditionsScreen extends Component {
  handleAccept = () => {
    const { email, token } = this.props.route.params;

    this.props.acceptTermsAndConditions({ email, invitationToken: token });
  };

  handleCancel = () => {
    const { t, navigation } = this.props;

    return Alert.alert(
      t("termsAndConditionsScreen.confirmCancelHeader"),
      t("termsAndConditionsScreen.confirmCancelDescription"),
      [
        {
          text: t("termsAndConditionsScreen.cancelButton"),
          style: "cancel",
        },
        {
          text: t("termsAndConditionsScreen.OKButton"),
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "LandingScreen" }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    const { t, isEntrepreneur } = this.props;
    const tcUri = isEntrepreneur
      ? constants.entrepreneur.termsAndConditionsUri
      : constants.investor.termsAndConditionsUri;

    const ppUri = isEntrepreneur
      ? constants.entrepreneur.privacyPolicyUri
      : constants.investor.privacyPolicyUri;

    const tcVideoUri = isEntrepreneur
      ? constants.entrepreneur.termsAndConditionsVideo
      : constants.investor.termsAndConditionsVideo;

    const dataArray = [
      {
        title: t("termsAndConditionsScreen.tcHeader"),
        content: <HTML uri={tcUri} />,
      },
      {
        title: t("termsAndConditionsScreen.ppHeader"),
        content: <HTML uri={ppUri} />,
      },
    ];

    return (
      <View
        style={{
          ...baseStylesheet.baseContainer,
          height: constants.windowHeight,
        }}
      >
        <View style={styles.imageContainer}>
          <DWG />
        </View>
        <ScrollView style={styles.buttonOffset}>
          <VideoView
            videoSource={tcVideoUri}
            size={{
              width: constants.windowWidth,
              height: constants.widescreenVideoHeight,
            }}
          />
          <Accordion dataArray={dataArray} />
        </ScrollView>
        <View style={styles.buttonView}>
          <Button
            onPress={() => this.handleAccept()}
            style={baseStylesheet.mainButton}
          >
            <Text style={baseStylesheet.mainButtonText}>
              {t("termsAndConditionsScreen.acceptButton")}
            </Text>
          </Button>

          <Button
            style={baseStylesheet.grayButton}
            onPress={() => this.handleCancel()}
          >
            <Text style={baseStylesheet.grayButtonText}>
              {t("termsAndConditionsScreen.closeButton")}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    acceptTermsAndConditions: (data) =>
      dispatch(acceptTermsAndConditions(data)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(null, mapDispatchToProps)
)(TermsAndConditionsScreen);

const styles = StyleSheet.create({
  imageContainer: {
    paddingTop: "10%",
    paddingBottom: "5%",
    alignItems: "center",
    backgroundColor: colors.offWhite,
  },
  buttonView: {
    width: "100%",
    padding: 20,
    paddingTop: 5,
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: colors.blueBorder,

    elevation: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
  },
  buttonOffset: { marginBottom: 150 },
});
