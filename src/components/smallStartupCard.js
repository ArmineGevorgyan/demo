import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { Icon, Button } from "native-base";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import { numberToCashFormatter } from "../helpers/numberHelper";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import GradientSlider from "./gradientSlider";
import constants from "../constants";

class SmallStartupCard extends Component {
  render() {
    const { t, startup } = this.props;
    const videoWidth = constants.windowWidth - 40; // 40 = cardHorizontalMargin
    const videoHeight = videoWidth / constants.widescreenVideoRatio;
    const videoUrl =
      startup.introVideoUrl || constants.entrepreneur.termsAndConditionsVideo;

    return (
      <View style={styles.cardContainer}>
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
                  {startup.location.city.name}
                </Text>
              </View>
            )}
            <View style={styles.startupDetailContainer}>
              <Icon name="user" type="AntDesign" style={styles.icon} />
              <Text style={styles.startupDetail}>
                {t("startupCard.referred")}
                {startup.referredBy || t("startupCard.draperRhino")}
              </Text>
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
        <VideoPlayer
          videoProps={{
            shouldPlay: false,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            source: { uri: videoUrl },
          }}
          height={videoHeight}
          width={videoWidth}
          showFullscreenButton={false}
        />
        <View style={styles.card}>
          <Text
            style={styles.description}
            ellipsizeMode="tail"
            numberOfLines={5}
          >
            {startup.description}
          </Text>
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
            <Text style={styles.text}>Commited </Text>
            <Text style={styles.number}>
              {numberToCashFormatter(startup.totalCommittedAmount)}
            </Text>
            <Text style={styles.text}> of </Text>
            <Text style={styles.number}>
              {numberToCashFormatter(startup.investmentGoal)}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => {}} style={styles.button}>
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
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    borderRadius: 6,
    backgroundColor: colors.cardBackground,
  },
  cardHeader: {
    backgroundColor: "white",
    flexDirection: "row",
  },
  headerContent: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  imageContainer: {
    width: "40%",
    justifyContent: "center",
    marginLeft: 5,
    marginBottom: 10,
    marginTop: 10,
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
    paddingTop: 10,
    paddingBottom: 10,
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
});
