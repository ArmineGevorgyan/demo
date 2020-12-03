import React, { Component } from "react";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { Icon, View } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";

class VideoView extends Component {
  videoRef;
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      positionMillis: 0,
    }
  };

  componentDidUpdate() {
    if (this.props.stopVideo) {
      this.videoRef.stopAsync();
    };
  };

  handlePlay = () => {
    if (this.videoRef !== null) {
      this.videoRef.playAsync();
    }
  }

  showVideoInFullscreen = async () => {
    const status = await this.videoRef.presentFullscreenPlayer();
  };

  dismissVideoFromFullscreen = async () => {
    const status = await this.videoRef.dismissFullscreenPlayer();
  };

  onFullscreenUpdate = ({ fullscreenUpdate, status }) => {
    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT: {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
        break;
      }
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS: {
        ScreenOrientation.unlockAsync();
      }
    }
  };

  onPlaybackStatusUpdate = (status) => {
    if (status.isPlaying) {
      if (!this.state.isPlaying) {
        this.setState({ isPlaying: true });
      }
    }
  };

  render() {
    return (
      <View style={this.props.size}>
        <Video
          resizeMode="cover"
          usePoster
          style={this.props.size}
          ref={(ref) => (this.videoRef = ref)}
          source={{ uri: this.props.videoSource }}
          posterSource={{ uri: this.props.posterSource }}
          posterStyle={{
            resizeMode:"contain"
          }}
          useNativeControls={this.state.isPlaying}
          onFullscreenUpdate={this.onFullscreenUpdate}
          onPlaybackStatusUpdate={this.onPlaybackStatusUpdate}
        />

        {!this.state.isPlaying &&
          <TouchableOpacity
            style={{
              width: this.props.size.width,
              height: this.props.size.height,
              ...styles.container,
            }}
          >
            <TouchableOpacity
              style={styles.iconButton}
              onPress={this.handlePlay}
            >
              <View style={styles.iconContainer}>
                <Icon
                  name="play"
                  type="Feather"
                  style={{
                    paddingLeft: 3,
                  }}
                />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        }
      </View>
    );
  }
};

export default VideoView;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    width: 50,
    height: 50,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    opacity:0.71,
  },
});