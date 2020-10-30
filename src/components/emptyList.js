import React, { Component } from "react";
import { Text, View } from "native-base";
import { colors } from "../styles/colors";

class EmptyList extends Component {
  render() {
    return (
      <View
        style={{
          height: "100%",
          paddingTop: "30%",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            color: colors.darkText,
            fontFamily: "montserrat-light",
          }}
        >
          {this.props.text}
        </Text>
      </View>
    );
  }
}

export default EmptyList;
