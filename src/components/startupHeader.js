import React, { Component } from "react";
import { View, Icon } from "native-base";
import { TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import VideoView from "./videoView";
import constants from "../constants";

class StartupHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { isFavorite: false };
  }

  addToFavouritesHandler = () => {
    this.props.setIsFavorite(!this.props.isFavorite);
  };

  backHandler = () => {
    this.props.goBack();
  };

  render() {
    const { startup } = this.props;

    return (
      <View
        style={{
          height: constants.startupHeaderHeight,
        }}
      >
        <VideoView
          videoSource={startup?.demoVideoUrl}
          posterSource={startup?.coverPhoto}
          navigation={this.props.navigation}
          size={{
            width: "100%",
            height: 250,
          }}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={{
              ...styles.iconButton,
              alignItems: "flex-start",
            }}
            onPress={this.backHandler}>
            <Icon name="arrow-left" type="Feather" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.iconButton,
              alignItems: "flex-end",
            }}
            onPress={this.addToFavouritesHandler}>
            {!this.props.isFavorite ? (
              <Icon name="star" type="Feather" style={styles.icon} />
            ) : (
                <Icon
                  name="star"
                  type="MaterialCommunityIcons"
                  style={{
                    color: "#FFFF00",
                  }}
                />
              )}
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={{ uri: startup?.logoUrl }} style={styles.logo} />
          </View>
        </View>
        <Text style={styles.startupTitle}>{startup?.name}</Text>
      </View>
    );
  }
}

export default StartupHeader;

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    width: "100%",
    height: 260,
    top: 0,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 70,
    height: 80,
    padding: 15,
    justifyContent: "center",
  },
  icon: {
    color: "#FFF",
  },
  logoContainer: {
    width: 90,
    height: 90,
    position: "absolute",
    bottom: 0,
    left: 0,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C7D7E6",
  },
  logo: {
    width: 87,
    height: 87,
    borderRadius: 50,
    backgroundColor: "#FFF",
  },
  startupTitle: {
    paddingTop: 5,
    paddingLeft: 110,
    fontSize: 20,
    color: "#262F3E",
    fontFamily: "montserrat-medium",
  },
});
