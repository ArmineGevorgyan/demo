import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { colors } from "../styles/colors";
import BlueHeader from "./blueHeader";
import { Icon } from "native-base";

class WelcomeHeader extends Component {
  render() {
    const { t, backButtonHandler } = this.props;

    return (
      <BlueHeader>
        <View style={styles.welcomeContainer}>
          {backButtonHandler && (
            <Icon
              style={styles.icon}
              name="arrow-left"
              type="Feather"
              onPress={backButtonHandler}
            />
          )}
          <Text style={styles.weclomeText}>
            {t("landingScreen.weclomeTitle")}
          </Text>
          <View style={styles.subtitleContainer}>
            <Text style={[styles.subtitleText, styles.boldText]}>
              {t("landingScreen.Draper") + " "}
            </Text>
            <Text style={styles.subtitleText}>{t("landingScreen.Rhino")}</Text>
          </View>
        </View>
      </BlueHeader>
    );
  }
}

export default compose(withTranslation("translations"))(WelcomeHeader);

const styles = StyleSheet.create({
  welcomeContainer: {
    justifyContent: "flex-end",
    marginTop: "20%",
  },
  weclomeText: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "montserrat-light",
    color: colors.secondaryText,
  },
  subtitleText: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "montserrat-light",
    color: colors.secondaryText,
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  boldText: {
    fontFamily: "montserrat-semi-bold",
  },
  icon: {
    marginTop: "-8%",
    color: "white",
    marginLeft: 20,
  },
});
