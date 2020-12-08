import { Card, Text, View } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Image, TouchableOpacity, } from "react-native";
import moment from "moment";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import LogoImage from "../../assets/whiteLogo.svg";
import { setNotificationSeen } from "../redux/ducks/notifications";
import { date } from "yup";

class NotificationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSeen: false,
    }
  }

  componentDidMount() {
    this.setState({ isSeen: this.props.data.seen })
  }

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

  setToSeen = () => {
    this.setState({ isSeen: true });
  }

  render() {
    const { data } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.props.setNotificationSeen(data.id, this.setToSeen)}>
        <Card
          style={{
            ...styles.container,
            backgroundCololr: !this.state.isSeen ? "#EFEFEF" : "#FFF"
          }}
        >
          {
            data.data.image ?
              <Image
                style={styles.imageContainer}
                source={{ uri: data.data.image }}
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
                  fontFamily: this.state.isSeen ? "montserrat-regular" : "montserrat-semi-bold"
                }}
              >
                {data.title}
              </Text>
              <Text>
                {this.getTime(data.createdAt)}
              </Text>
            </View>
            <Text
              numberOfLines={3}
              style={{
                fontFamily: "montserrat-regular",
                color: this.state.isSeen ? "#707070" : "#1E87F4"
              }}
            >
              {data.body}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    )
  };
};


const mapStateToProps = (state, props) => {

  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNotificationSeen: (id, setSeen) => dispatch(setNotificationSeen(id, setSeen)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
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