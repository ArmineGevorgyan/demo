import React, { Component } from "react";
import { compose } from "redux";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Content } from "native-base";
import { baseStylesheet } from "../styles/baseStylesheet";
import { withTranslation } from "react-i18next";
import { colors } from "../styles/colors";
import WelcomeHeader from "../components/welcomeHeader";
import Background from "../components/background";
import constants from "../constants";

class RequestInviteSuccess extends Component {
  handleClose = () => {
    this.props.navigation.navigate("LandingScreen");
  };

  render() {
    const { t } = this.props;

    return (
      <Content style={baseStylesheet.baseContainer}>
        <WelcomeHeader />
        <Background minHeight={constants.blueHeaderContentHeight}>
          <View style={styles.contextContainer}>
            <Text style={styles.header}>
              {t("requestInviteSuccess.congratulations")}
            </Text>
            <View style={styles.imageContainer}>
              <Image
                style={styles.successIcon}
                source={require("../../assets/request-success.png")}
              />
            </View>
            <Text style={styles.contextHeading}>
              {t("requestInviteSuccess.contextHeading")}
            </Text>
            <Text style={baseStylesheet.mainContentText}>
              {t("requestInviteSuccess.context")}
            </Text>

            <View style={styles.buttonView}>
              <TouchableOpacity
                onPress={() => this.handleClose()}
                style={baseStylesheet.secondaryButton}
              >
                <Text style={baseStylesheet.secondaryButtonText}>
                  {t("requestInviteSuccess.OKButton")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Background>
      </Content>
    );
  }
}

export default compose(withTranslation("translations"))(RequestInviteSuccess);

const styles = StyleSheet.create({
  contextContainer: {
    padding: "10%",
    paddingTop: "5%",
  },
  imageContainer: {
    marginBottom: "10%",
    alignItems: "center",
  },
  successIcon: {
    width: 100,
    height: 70,
  },
  header: {
    color: colors.secondaryButtonText,
    fontSize: 30,
    textAlign: "center",
    fontFamily: "montserrat-light",
    marginBottom: "10%",
  },
  contextHeading: {
    fontSize: 20,
    marginBottom: "5%",
    textAlign: "center",
    fontFamily: "montserrat-semi-bold",
    zIndex: 1,
  },
  buttonView: {
    width: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
});
