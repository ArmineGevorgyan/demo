import { Card, Image, Text, View } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import constants from "../constants";
import moment from "moment";

class NotificationItem extends Component {

  getTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const datetimeHours = new Date(dateString).getHours();
    const hours = new Date().getHours();

    const rightNowUTC = moment.utc().valueOf();
    let duration = moment.utc(dateString).valueOf();
    // let remainingTimeInMls = duration.asMilliseconds();


    const today = moment().endOf('day')
    
    // const yesterday = moment().subtract(1, 'day').endOf('day')
    // if (moment(dateString) < today) return moment.utc(dateString).format("LT")
    // if (moment(dateString) < yesterday) return 'Yesterday'

    return moment(dateString).format("dd/mm/yyyy");
  }

  render() {

    const { data } = this.props;

    return (
      <Card
        style={{
          ...styles.container,
          backgroundCololr: !data.seen ? "#EFEFEF" : "#FFF"
        }}
      >
        <View style={{
          width: 48,
          height: 48,
          marginRight: 5,
          borderRadius: 50,
        }}>
          {/* <Image source={{ uri: "" }} /> */}
        </View>
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


export default NotificationItem;

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
  }
});