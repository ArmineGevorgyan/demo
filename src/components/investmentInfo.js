import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "react-native-slider-custom";
import { Icon } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import moment from "moment";
import { colors } from "../styles/colors";
import constants from "../constants";
import { numberToCashFormatter } from "../helpers/numberHelper";

class InvestmentInfo extends Component {
  render() {
    const { t, startup } = this.props;

    const gradient = (
      <View style={styles.trackBorder}>
        <LinearGradient
          colors={[colors.darkGradient, colors.lightGradient]}
          style={styles.track}
          start={[0, 0]}
          end={[1, 0]}
        />
      </View>
    );

    const thumb = (
      <View>
        <Icon name="triangle-down" type="Entypo" style={styles.icon} />
        <View height={5} />
        <Icon name="triangle-up" type="Entypo" style={styles.icon} />
      </View>
    );

    return (
      <View>
        <View style={[styles.row, styles.separator]}>
          <Text style={[styles.info, styles.infoTitle]}>
            {t("investmentInfo.goal")}
          </Text>
          <Text style={[styles.info, styles.investmentGoal]}>
            {numberToCashFormatter(startup.investmentGoal)}
          </Text>
        </View>
        <View style={[styles.row, styles.separator]}>
          <Text style={[styles.info, styles.infoTitle]}>
            {t("investmentInfo.runway")}
          </Text>
          <Text style={styles.info}>
            {startup.runway} {t("investmentInfo.months")}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.info, styles.infoTitle]}>
            {t("investmentInfo.total")}
          </Text>
          <Text style={[styles.info, styles.total]}>
            {numberToCashFormatter(startup.totalCommittedAmount)}
          </Text>
        </View>
        <View style={[styles.separator, styles.slider]}>
          <Slider
            disabled={true}
            trackStyle={styles.trackContainer}
            customMinimumTrack={gradient}
            customThumb={thumb}
            minimumValue={0}
            maximumValue={startup.investmentGoal}
            value={startup.totalCommittedAmount}
            minimumTrackTintColor={colors.secondaryColor}
            maximumTrackTintColor="#E4EBF2"
          />
        </View>
        <View style={[styles.row, styles.separator]}>
          <Text style={[styles.info, styles.infoTitle]}>
            {t("investmentInfo.committedInvestors")}
          </Text>
          <Text style={styles.info}>{startup.committedInvestors}</Text>
        </View>
        <View style={[styles.row, styles.separator]}>
          <Text style={[styles.info, styles.infoTitle]}>
            {t("investmentInfo.interestedInvestors")}
          </Text>
          <Text style={styles.info}>{startup.interestedInvestors}</Text>
        </View>
        <View style={[styles.row, styles.separator]}>
          <Text style={[styles.info, styles.dateInfoTitle]}>
            {t("investmentInfo.upcomingAMA")}
          </Text>
          <Text style={styles.info}>
            {moment(startup.upcomingAMADate).format("ll")}
          </Text>
        </View>
        <View style={[styles.row, styles.separator]}>
          <Text style={[styles.info, styles.dateInfoTitle]}>
            {t("investmentInfo.commitmentDeadline")}
          </Text>
          <Text style={styles.info}>
            {moment(startup.commitmentDeadline).format("ll")}
          </Text>
        </View>
      </View>
    );
  }
}

export default compose(withTranslation("translations"))(InvestmentInfo);

const fontSize = constants.windowWidth > 350 ? 20 : 18;

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: colors.blueBorder,
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  row: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 12,
  },
  info: {
    fontSize: fontSize,
    fontFamily: "montserrat-bold",
    color: colors.darkBlue,
  },
  infoTitle: {
    color: colors.blackBlue,
    maxWidth: "75%",
  },
  investmentGoal: {
    color: colors.green,
  },
  total: {
    color: colors.lightBlue,
  },
  dateInfoTitle: {
    color: colors.blackBlue,
    maxWidth: "50%",
  },
  slider: {
    marginTop: 5,
  },
  track: {
    height: 20,
  },
  trackContainer: {
    height: 20,
    borderRadius: 10,
    borderColor: "#C7D7E6",
  },
  trackBorder: {
    height: 20,
    borderRightWidth: 1,
    borderColor: "white",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  icon: {
    color: colors.blueBorder,
  },
});
