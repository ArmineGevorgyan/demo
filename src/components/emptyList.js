import React, { Component } from "react";
import {Text} from "native-base";
import {colors} from "../styles/colors";

class EmptyList extends Component{
  render(){
    return(
      <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            marginTop: 130,
            color: colors.darkText,
          }}
        >
          {this.props.text}
        </Text>
    )
  };
};

export default EmptyList;