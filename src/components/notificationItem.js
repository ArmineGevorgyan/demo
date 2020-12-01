import { Image, Text, View } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";

class NotificationItem extends Component {

  render() {

    const { title, time, content, } = this.props;

    return (
      <View
        style={styles.container}
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
            <Text>{title}</Text>
            <Text>{time}</Text>
          </View>
          <Text>{content}</Text>
        </View>
      </View>
    )
  };
};


export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    padding: 10,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});