import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { colors } from "../styles/colors";

class Copyright extends Component {
  render() {
    const { t } = this.props;

    return (
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyright}>{t("landingScreen.copyright")}</Text>
      </View>
    );
  }
}

export default compose(withTranslation("translations"))(Copyright);

const styles = StyleSheet.create({
  copyrightContainer: {
    position: "absolute",
    bottom: 15,
    width: "100%",
  },
  copyright: {
    textAlign: "center",
    color: colors.darkText,
    fontFamily: "montserrat-regular",
    fontSize: 10,
  },
});
