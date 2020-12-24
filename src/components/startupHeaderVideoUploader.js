import React, { Component } from "react";
import { View, Icon } from "native-base";
import { withTranslation } from "react-i18next";
import { TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import VideoView from "./videoView";
import constants from "../constants";
import AddVideoIcon from "../../assets/video-add.svg";
import SelectImage from "./selectImage";

class StartupHeaderVideoUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { isFavorite: false };
  }

  onNotificationClick = () => {};

  render() {
    const { t, startup } = this.props;

    return (
      <View
        style={{
          height: constants.startupHeaderHeight,
        }}
      >
        {/* TODO add if statement to check if video exist or not 
         <VideoView
          videoSource={startup?.demoVideoUrl}
          posterSource={startup?.coverPhoto}
          navigation={this.props.navigation}
          size={{
            width: "100%",
            height: 250,
          }}
        /> */}
        <View style={styles.container}>
          <View style={styles.videoIconTextContainer}>
            <View style={styles.videoIconContainer}>
              <AddVideoIcon />
            </View>
            <Text style={styles.introVideoText}>
              {t("startupHeader.introVideo")}
            </Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {/*//TODO left here for burger menu icon
             <TouchableOpacity onPress={this.backHandler}>
            <Icon name="arrow-left" type="Feather" style={styles.icon} />
          </TouchableOpacity> */}
            <TouchableOpacity onPress={this.onNotificationClick}>
              <Icon name="bell" type="Feather" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.logoContainer}>
            <SelectImage isLogo photoUrl={""} setImage={() => {}} />
          </View>
        </View>
        <Text style={styles.startupTitle}>{startup?.name}</Text>
      </View>
    );
  }
}

export default withTranslation("translations")(StartupHeaderVideoUploader);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 250,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  videoIconTextContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    position: "absolute",
    width: "90%",
    height: 260,
    top: 30,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  icon: {
    color: "#FFF",
  },
  logoContainer: {
    width: 90,
    height: 90,
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
  videoIconContainer: {
    width: 46,
    height: 46,
    backgroundColor: "#FFFFFF",
    opacity: 0.71,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  introVideoText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "montserrat-regular",
  },
  startupTitle: {
    paddingTop: 5,
    paddingLeft: 110,
    fontSize: 20,
    color: "#262F3E",
    fontFamily: "montserrat-medium",
  },
});
