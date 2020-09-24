import React, { Component } from "react";
import { ImageBackground } from "react-native";
import BackgroundImage from "../../assets/background.png";

class Background extends Component {
  render() {
    return (
      <ImageBackground
        source={BackgroundImage}
        style={{
          width: "100%",
          minHeight: this.props.minHeight,
        }}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}

export default Background;
