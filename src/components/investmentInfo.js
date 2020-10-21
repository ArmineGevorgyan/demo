import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import moment from "moment";
import { colors } from "../styles/colors";
import constants from "../constants";
import { numberToCashFormatter } from "../helpers/numberHelper";
import GradientSlider from "./gradientSlider";

class InvestmentInfo extends Component {
  render() {
    const { t, startup } = this.props;

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
          {GradientSlider(
            0,
            startup.investmentGoal,
            startup.totalCommittedAmount
          )}
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
});
