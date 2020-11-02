import React, { Component } from "react";
import { compose } from "redux";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Content } from "native-base";
import { withTranslation } from "react-i18next";
import { baseStylesheet } from "../styles/baseStylesheet";
import DraperRhino from "../../assets/draper-rhino.svg";
import GrayHeader from "../components/grayHeader";

class ContactUsSuccess extends Component {
  render() {
    const { t, navigation } = this.props;

    return (
      <Content style={baseStylesheet.baseContainer}>
        <GrayHeader
          title={t("contactUsSuccess.headerText")}
          backButtonHandler={() => {
            navigation.pop(2);
          }}
        />
        <View style={styles.contextContainer}>
          <View style={styles.imageContainer}>
            <DraperRhino />
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.successIcon}
              source={require("../../assets/request-success.png")}
            />
          </View>
          <Text style={styles.contextHeading}>
            {t("contactUsSuccess.contextHeading")}
          </Text>
          <Text style={styles.mainContentText}>
            {t("contactUsSuccess.context")}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={baseStylesheet.secondaryButton}
          >
            <Text style={baseStylesheet.secondaryButtonText}>
              {t("contactUsSuccess.OKButton")}
            </Text>
          </TouchableOpacity>
        </View>
      </Content>
    );
  }
}

export default compose(withTranslation("translations"))(ContactUsSuccess);

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
    height: 70,
  },
  mainContentText: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: "20%",
  },
  contextHeading: {
    fontSize: 15,
    marginBottom: "5%",
    textAlign: "center",
    fontFamily: "montserrat-semi-bold",
  },
});
