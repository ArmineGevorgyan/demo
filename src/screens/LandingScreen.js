import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";

class LandingScreen extends Component {
  render() {
    const { t, navigation } = this.props;

    return (
      <View style={baseStylesheet.baseContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            {t("landingScreen.weclomeText")}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
          />
        </View>
        <View style={styles.landingButtons}>
          <TouchableOpacity>
            <Text style={baseStylesheet.mainButton}>
              {t("landingScreen.getStartedButton")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("RequestAnInvite")}
          >
            <Text style={baseStylesheet.secondaryButton}>
              {t("landingScreen.RequestInviteButton")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default compose(withTranslation("translations"))(LandingScreen);

const styles = StyleSheet.create({
  welcomeContainer: {
    justifyContent: "flex-end",
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "200",
    color: colors.mainText,
  },
  imageContainer: {
    flex: 2,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 207,
  },
  landingButtons: {
    flex: 2,
    width: "80%",
  },
});
