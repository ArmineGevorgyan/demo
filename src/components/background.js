import React, { Component } from "react";
import { ImageBackground, Dimensions } from "react-native";
import BackgroundImage from "../../assets/background.png";

class Background extends Component {
  render() {
    const { minHeight = Dimensions.get("window").height } = this.props;

    return (
      <ImageBackground
        source={BackgroundImage}
        style={{
          width: "100%",
          minHeight: minHeight,
        }}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}

export default Background;
