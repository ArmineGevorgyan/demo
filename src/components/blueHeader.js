import React, { Component } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import HeaderImage from "../../assets/blue-header.png";
import constants from "../constants";

class BlueHeader extends Component {
  render() {
    return (
      <ImageBackground source={HeaderImage} style={styles.blueHeader}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

export default BlueHeader;

const styles = StyleSheet.create({
  blueHeader: {
    width: "100%",
    height: constants.blueHeaderHeight,
  },
});
