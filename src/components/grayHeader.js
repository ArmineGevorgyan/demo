import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/colors";

class GrayHeader extends Component {
  render() {
    const { title, children } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{title}</Text>
        {children}
      </View>
    );
  }
}

export default GrayHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: "7%",
    paddingRight: "7%",
    backgroundColor: colors.offWhite,
  },
  headerText: {
    color: colors.blackBlue,
    fontSize: 30,
    fontFamily: "montserrat-light",
    textAlign: "center",
    marginBottom: 15,
  },
});
