import { Card, Text, View } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Image, } from "react-native";
import moment from "moment";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import LogoImage from "../../assets/whiteLogo.svg";

class NotificationItem extends Component {

  getTime(dateString) {
    const format = "DD/MM/YYYY";
    const startDate = moment(moment(), format);
    const endDate = moment(moment().subtract(7, "day"), format);
    const targetDate = moment(moment.utc(dateString), format);

    //check if today
    if (moment(dateString).isSame(moment(), "day")) {
      return moment.utc(dateString).format("LT");
    }

    //check if yesterday
    if (moment(dateString).isSame(moment().subtract(1, "day"), "day")) {
      return this.props.t("notificationsScreen.yesterday");
    }

    //check if within week
    if (targetDate.isBetween(endDate, startDate, "days", true)) {
      let dt = moment(dateString, "YYYY-MM-DD HH:mm:ss")
      return dt.format("dddd");
    }

    return moment(dateString).format(format);
  };

  render() {
    const { data } = this.props;

    return (
      <Card
        style={{
          ...styles.container,
          backgroundCololr: !data.seen ? "#EFEFEF" : "#FFF"
        }}
      >
        {
          data.uri ?
            <Image
              style={styles.imageContainer}
              source={{ uri: data.uri }}
            />
            :
            <View style={[
              styles.imageContainer,
              styles.logo,
            ]}>
              <LogoImage />
            </View>
        }
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: data.seen ? "montserrat-regular" : "montserrat-semi-bold"
              }}
            >
              {data.title}
            </Text>
            <Text>
              {this.getTime(data.createdAt)}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "montserrat-regular",
              color: data.seen ? "#707070" : "#1E87F4"
            }}
          >
            {data.body}
          </Text>
        </View>
      </Card>
    )
  };
};


export default compose(
  withTranslation("translations")
)(NotificationItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: 48,
    height: 48,
    marginRight: 5,
    borderRadius: 50,
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E87F4",
  },
});