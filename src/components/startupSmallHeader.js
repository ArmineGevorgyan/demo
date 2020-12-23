import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Icon, } from "native-base";
import BackgroundImage from "../../assets/blue-header-rect.png";

class SmallStartupHeader extends Component {
  render() {
    return (
      <ImageBackground
        source={BackgroundImage}
        style={styles.container}
      >
        <View style={styles.content}>
          <TouchableOpacity
            style={{
              ...styles.iconButton,
              alignItems: "flex-start",
            }}
            onPress={this.props.goBack}>
            <Icon name="arrow-left" type="Feather" style={styles.icon} />
          </TouchableOpacity>

          <Text style={styles.title}>
            {this.props.name}
          </Text>

          <TouchableOpacity
            style={{
              ...styles.iconButton,
              alignItems: "flex-end",
            }}
            onPress={
              () => this.props.setIsFavorite(!this.props.isFavorite)
            }>
            {
              !this.props.isFavorite ? (
                <Icon
                  name="star"
                  type="Feather"
                  style={styles.icon}
                />
              ) : (
                  <Icon
                    name="star"
                    type="MaterialCommunityIcons"
                    style={{
                      color: "#FFFF00",
                    }}
                  />
                )
            }
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  };
};

export default SmallStartupHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#FFF",
    fontSize: 22,
    fontFamily: "montserrat-semi-bold",
  },
  iconButton: {
    width: 70,
    height: 70,
    padding: 15,
    justifyContent: "center",
  },
  icon: {
    color: "#FFF",
  },
});