import React, { Component } from "react";
import { ImageBackground} from "react-native";
import BackgroundImage from "../../assets/background.png";

class Background extends Component {
  render() {
    return (
      <ImageBackground
        source={BackgroundImage}
        style={{
          width: "100%",
          height:"100%",
          flex:1,
        }}
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}

export default Background;
