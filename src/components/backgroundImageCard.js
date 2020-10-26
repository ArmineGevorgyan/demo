import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import moment from "moment";
import { baseStylesheet } from "../styles/baseStylesheet";
import { numberToCashFormatter } from "../helpers/numberHelper";
import { colors } from "../styles/colors";
import GradientSlider from "./gradientSlider";

class BackgroundImageCard extends Component {
  render() {
    const { t, startup } = this.props;

    const startupDetail = (title, detail) => {
      return (
        <View style={styles.startupDetail}>
          <Text style={styles.label}>{title}</Text>
          <Text style={styles.detail}>{detail}</Text>
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <Text style={styles.dateAdded}>{moment().format("ll")}</Text>
        <View style={[styles.cardContainer, baseStylesheet.elevation6]}>
          <ImageBackground
            source={{
              uri:
                "https://www.pharmalive.com/wp-content/uploads/2020/07/Tesla-to-Build-Mobile-RNA-Microfactories-for-CureVacs-COVID-19-Vaccine-BioSpace-7-2-20-495x350.jpeg",
            }}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.cardHeader}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: startup.logoUrl }} style={styles.logo} />
              </View>
              <Text style={styles.startupName}>{startup.name}</Text>
            </View>
            <View style={[styles.cardContent, baseStylesheet.elevation3]}>
              {startupDetail(
                t("backgroundImageCard.industry"),
                startup.industry.name
              )}
              {startupDetail(
                t("backgroundImageCard.goal"),
                numberToCashFormatter(startup.investmentGoal)
              )}
              {startupDetail(
                t("backgroundImageCard.runway"),
                `${startup.runway} ${t("backgroundImageCard.months")}`
              )}
              {startupDetail(
                t("backgroundImageCard.total"),
                numberToCashFormatter(startup.totalCommittedAmount)
              )}
              {startup.committedInvestors > 0 ??
                startupDetail(
                  t("backgroundImageCard.committedInvestors"),
                  startup.committedInvestors
                )}
              {startup.interestedInvestors > 0 ??
                startupDetail(
                  t("backgroundImageCard.interestedInvestors"),
                  startup.interestedInvestors
                )}
              {startupDetail(
                t("backgroundImageCard.deadline"),
                moment(startup.commitmentDeadline).format("ll")
              )}
              <View style={styles.slider}>
                {GradientSlider(
                  0,
                  startup.investmentGoal,
                  startup.totalCommittedAmount
                )}
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default compose(withTranslation("translations"))(BackgroundImageCard);

const styles = StyleSheet.create({
  container: { margin: 10 },
  dateAdded: {
    color: colors.darkText,
    fontSize: 12,
    fontFamily: "montserrat-regular",
    marginBottom: 5,
  },
  cardContainer: {
    borderRadius: 15,
    overflow: "hidden",
  },
  imageBackground: { width: "100%" },
  imageStyle: { borderRadius: 15 },
  cardHeader: {
    width: "100%",
    flexDirection: "row",
    height: 50,
  },
  imageContainer: {
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 5,
    paddingBottom: 5,
    paddingTop: 10,
  },
  logo: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  startupName: {
    fontSize: 20,
    fontFamily: "montserrat-bold",
    color: "white",
    marginTop: 15,
  },
  cardContent: {
    width: "100%",
    backgroundColor: colors.overlay,
    paddingTop: 10,
    paddingBottom: 17,
    paddingLeft: 20,
    paddingRight: 20,
  },
  startupDetail: {
    flexDirection: "row",
    marginBottom: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
    color: "white",
    width: "60%",
    paddingLeft: 5,
  },
  detail: {
    fontSize: 14,
    fontFamily: "montserrat-bold",
    color: "white",
  },
  slider: {
    marginTop: 10,
  },
});
