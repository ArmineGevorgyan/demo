import React, { Component } from "react";
import { compose } from "redux";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Content } from "native-base";
import { withTranslation } from "react-i18next";
import { baseStylesheet } from "../styles/baseStylesheet";
import DraperRhino from "../../assets/draper-rhino.svg";
import GrayHeader from "../components/grayHeader";

class ResetPasswordSuccess extends Component {
  render() {
    const { t, navigation } = this.props;

    return (
      <Content style={baseStylesheet.baseContainer}>
        <GrayHeader title={t("resetPasswordSuccess.headerText")} />
        <View style={styles.contextContainer}>
          <View style={styles.imageContainer}>
            <DraperRhino />
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.successIcon}
              source={require("../../assets/lock.png")}
            />
          </View>
          <Text style={baseStylesheet.mainContentText}>
            {t("resetPasswordSuccess.content")}
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "LandingScreen" }],
              })
            }
            style={baseStylesheet.secondaryButton}
          >
            <Text style={baseStylesheet.secondaryButtonText}>
              {t("resetPasswordSuccess.OKButton")}
            </Text>
          </TouchableOpacity>
        </View>
      </Content>
    );
  }
}

export default compose(withTranslation("translations"))(ResetPasswordSuccess);

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    marginBottom: "20%",
  },
  contextContainer: {
    padding: "10%",
    paddingTop: "8%",
  },
  successIcon: {
    width: 100,
    height: 100,
  },
});
