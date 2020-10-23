import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { Icon, Button } from "native-base";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import InvestmentInfo from "./investmentInfo";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import Calendar from "../../assets/calendar.svg";
import Share from "../../assets/share.svg";
import constants from "../constants";

class StartupCard extends Component {
  render() {
    const { t, startup } = this.props;
    const videoWidth = constants.windowWidth - 64; // 64 = cardHorizontalMargin + card padding
    const videoHeight = videoWidth / constants.widescreenVideoRatio;
    const videoUrl =
      startup.introVideoUrl || constants.entrepreneur.termsAndConditionsVideo;

    return (
      <View style={[styles.cardContainer, baseStylesheet.elevation6]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: startup.logoUrl }} style={styles.logo} />
        </View>
        <View style={styles.cardHeader}>
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
            <Text style={styles.startupDetail}>
              {t("startupCard.referredBy")}
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
              <Text style={styles.startupDetail}>{startup.industry.name}</Text>
            </View>
          )}
        </View>
        <View style={styles.separator} />
        <View style={styles.card}>
          <Text
            style={styles.description}
            ellipsizeMode="tail"
            numberOfLines={5}
          >
            {startup.description}
          </Text>

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

          <InvestmentInfo startup={startup} />
          <View>
            <Button style={baseStylesheet.secondaryButton}>
              <Text style={baseStylesheet.secondaryButtonText}>
                {t("startupCard.learnMore")}
              </Text>
            </Button>
            <Button style={baseStylesheet.grayFillButton}>
              <Calendar />
              <Text style={baseStylesheet.iconButtonText}>
                {t("startupCard.book")}
              </Text>
              <Share style={styles.buttonIcon} />
            </Button>
            <Button style={[baseStylesheet.mainButton, styles.button]}>
              <Text style={baseStylesheet.mainButtonText}>
                {t("startupCard.joinAMA")}
              </Text>
            </Button>
            <Button style={baseStylesheet.greenFillButton}>
              <Text style={baseStylesheet.mainButtonText}>
                {t("startupCard.commit")}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default compose(withTranslation("translations"))(StartupCard);

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 6,
    backgroundColor: colors.cardBackground,
  },
  cardHeader: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingRight: 20,
  },
  card: {
    paddingTop: 20,
    paddingRight: 12,
    paddingLeft: 12,
    paddingBottom: 15,
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
  imageContainer: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  icon: {
    fontSize: 12,
    color: colors.darkText,
    width: 20,
    paddingTop: 2,
  },
  separator: {
    borderBottomColor: colors.blueBorder,
    borderBottomWidth: 1,
    marginLeft: 13,
    marginRight: 13,
  },
  description: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
    color: colors.darkText,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 0,
  },
  buttonIcon: {
    marginTop: -12,
    marginRight: -5,
  },
});
