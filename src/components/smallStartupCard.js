import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { Icon } from "native-base";
import { numberToCashFormatter } from "../helpers/numberHelper";
import { colors } from "../styles/colors";
import GradientSlider from "./gradientSlider";
import constants from "../constants";
import { baseStylesheet } from "../styles/baseStylesheet";
import VideoView from "./videoView";

class SmallStartupCard extends Component {
  render() {
    const { t, startup, navigation } = this.props;
    const videoWidth = constants.windowWidth - 60; // 60 = cardHorizontalMargin
    const videoHeight = videoWidth / constants.widescreenVideoRatio;
    const fullName = startup.referredByUser
      ? `${startup.referredByUser.firstName} ${startup.referredByUser.lastName}`
      : null;

    return (
      <View style={[styles.cardContainer, baseStylesheet.elevation6]}>
        <View style={styles.cardHeader}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: startup.logoUrl }} style={styles.logo} />
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.startupName}>{startup.name}</Text>
            {startup.location && (
              <View style={styles.startupDetailContainer}>
                <Icon name="location" type="Octicons" style={styles.icon} />
                <Text style={styles.startupDetail}>
                  {startup.location.city.name}, {startup.location.country.name}
                </Text>
              </View>
            )}
            <View style={styles.startupDetailContainer}>
              <Icon name="user" type="AntDesign" style={styles.icon} />
              {fullName ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("InvestorProfileScreen", {
                      investorId: startup.referredByUser.id,
                    })
                  }
                >
                  <Text style={[styles.startupDetail, styles.link]}>
                    {t("startupCard.referred")}
                    {fullName}
                  </Text>
                </TouchableOpacity>
              ) : (
                  <Text style={styles.startupDetail}>
                    {t("startupCard.referred")}
                    {t("startupCard.draperRhino")}
                  </Text>
                )}
            </View>
            {startup.industry && (
              <View style={styles.startupDetailContainer}>
                <Icon
                  name="business-center"
                  type="MaterialIcons"
                  style={styles.icon}
                />
                <Text style={styles.startupDetail}>
                  {startup.industry.name}
                </Text>
              </View>
            )}
          </View>
        </View>
        {startup.introVideoUrl && (
          <VideoView
            videoSource={startup.introVideoUrl}
            navigation={this.props.navigation}
            size={{
              width: videoWidth,
              height: videoHeight,
            }}
          />
        )}
        <View style={styles.card}>
          <View style={styles.descriptionContainer}>
            <Text
              style={styles.description}
              ellipsizeMode="tail"
              numberOfLines={5}
            >
              {startup.description}
            </Text>
          </View>
          <View style={styles.slider}>
            {GradientSlider(
              0,
              startup.investmentGoal,
              startup.totalCommittedAmount
            )}
          </View>
          <View
            style={styles.sliderDescription}
            ellipsizeMode="tail"
            numberOfLines={5}
          >
            <Text style={styles.text}>{t("startupCard.committed")} </Text>
            <Text style={styles.number}>
              {numberToCashFormatter(startup.totalCommittedAmount)}
            </Text>
            <Text style={styles.text}>{t("startupCard.of")}</Text>
            <Text style={styles.number}>
              {numberToCashFormatter(startup.investmentGoal)}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={
              () => { this.props.navigation.navigate("StartupScreen", { startup }) }
            }
          >
            <Text style={styles.buttonText}>
              {t("startupCard.fullProfile")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default compose(withTranslation("translations"))(SmallStartupCard);

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 6,
    backgroundColor: colors.cardBackground,
    overflow: "hidden",
  },
  cardHeader: {
    backgroundColor: "white",
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 10,
    paddingBottom: 10,
  },
  imageContainer: {
    width: "40%",
    justifyContent: "center",
  },
  logo: {
    height: 100,
    width: "100%",
    resizeMode: "contain",
  },
  startupName: {
    fontSize: 20,
    fontFamily: "montserrat-bold",
    color: colors.blackBlue,
    marginBottom: 4,
  },
  startupDetail: {
    fontSize: 12,
    fontFamily: "montserrat-regular",
    color: colors.darkText,
    marginBottom: 2,
    width: "70%",
  },
  startupDetailContainer: {
    flexDirection: "row",
  },
  icon: {
    fontSize: 12,
    color: colors.darkText,
    width: 20,
    paddingTop: 2,
  },
  card: {
    paddingRight: 12,
    paddingLeft: 12,
    paddingBottom: 15,
  },
  description: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
    color: colors.darkText,
  },
  descriptionContainer: {
    paddingTop: 10,
    height: 100,
    justifyContent: "center",
    alignContent: "center",
  },
  slider: {
    paddingBottom: 5,
  },
  sliderDescription: {
    flexDirection: "row",
  },
  text: {
    fontSize: 12,
    fontFamily: "montserrat-regular",
    color: colors.darkText,
  },
  number: {
    fontSize: 12,
    fontFamily: "montserrat-bold",
    color: colors.lightBlue,
  },
  buttonContainer: {
    backgroundColor: colors.cardBackground,
    alignItems: "center",
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    width: 160,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: colors.blueBorder,
  },
  buttonText: {
    color: colors.secondaryButtonText,
    textAlign: "center",
    fontSize: 12,
    fontFamily: "montserrat-regular",
    textTransform: "uppercase",
  },
  link: {
    color: colors.lightBlue,
  },
});
