import React, { Component } from "react";
import { View, Icon, } from "native-base";
import { TouchableOpacity, StyleSheet, Image, Text, } from "react-native";
import VideoView from "./videoView";
import constants from "../constants";

class StartupHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { isFavorite: false, }
  }

  addToFavouritesHandler = () => {
    this.setState({ isFavorite: !this.state.isFavorite })
  };

  backHandler = () => {
    this.props.goBack(this.state.isFavorite);
  };

  render() {
    const {
      startup, } = this.props;

    return (
      <View
        style={{
          height: constants.startupHeaderHeight,
        }}
      >
        <VideoView
          videoSource={startup?.demoVideoUrl}
          posterSource={startup?.coverPhoto}
          size={{
            width: "100%",
            height: 250,
          }}
        />
        <View
          style={styles.iconContainer}>
          <TouchableOpacity
            onPress={this.backHandler}
          >
            <Icon
              name="arrow-left"
              type="Feather"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.addToFavouritesHandler}
          >
            {!this.state.isFavorite ?
              <Icon
                name="star"
                type="Feather"
                style={styles.icon}
              />
              :
              <Icon
                name="star"
                type="MaterialCommunityIcons"
                style={{
                  color: "#FFFF00",
                }}
              />}

          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: startup?.logoUrl }}
              style={styles.logo}
            />
          </View>
        </View>
        <Text style={styles.startupTitle }>
          {startup?.name}
        </Text>
      </View>
    )
  };
};

export default StartupHeader;

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    width: "90%",
    height: 260,
    top: 30,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
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
    paddingLeft: 110,
    fontSize: 20,
    color: "#262F3E",
    fontFamily: "montserrat-medium",
  },
});