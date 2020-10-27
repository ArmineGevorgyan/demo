import React, { Component } from "react";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

class VideoView extends Component {
  videoRef;

  showVideoInFullscreen = async () => {
    const status = await this.videoRef.presentFullscreenPlayer();
  };

  dismissVideoFromFullscreen = async () => {
    const status = await this.videoRef.dismissFullscreenPlayer();
  };

  onFullscreenUpdate = ({ fullscreenUpdate, status }) => {
    console.log(fullscreenUpdate, status)
    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT: {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        break;
      }
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS: {
        ScreenOrientation.unlockAsync();
      }
    }
  };

  render() {
    return (
      <Video
        ref={(ref) => (this.videoRef = ref)}
        source={{ uri: this.props.videoSource }}
        resizeMode="cover"
        useNativeControls
        onFullscreenUpdate={this.onFullscreenUpdate}
        style={this.props.size}
      />
    );
  }
};

export default VideoView;