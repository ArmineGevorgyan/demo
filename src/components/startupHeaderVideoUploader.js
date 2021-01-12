import React, { Component } from "react";
import { View, Icon, Spinner } from "native-base";
import { withTranslation } from "react-i18next";
import { uploadFile, resetImage } from "../redux/ducks/fileUploader";
import { connect } from "react-redux";
import { compose } from "redux";
import { TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import VideoView from "./videoView";
import constants from "../constants";
import AddVideoIcon from "../../assets/video-add.svg";
import SelectImage from "./selectImage";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../styles/colors";
import Modal from "react-native-modal";
import { baseStylesheet } from "../styles/baseStylesheet";
import { handleFieldEdit, handleFieldSave } from "../redux/ducks/startup";

class StartupHeaderVideoUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
      image: null,
      isModalOpen: false,
    };
  }

  componentDidMount() {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }

  componentDidUpdate(prevProps) {
    if (this.props.dVideo !== prevProps.dVideo) {
      this.props.handleFieldEdit(
        "demoVideoUrl",
        this.props.dVideo,
        this.props.startup?.id
      );
      this.props.handleFieldSave("demoVideoUrl", this.props.startup?.id);
    }
  }

  pickImage = async () => {
    let result;

    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    if (!result.cancelled) {
      this.props.uploadFile(result);
    }
  };

  onNotificationClick = () => {};

  render() {
    const { t, startup, isLoadingVideo, entrepreneurStartups } = this.props;

    return (
      <>
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
              {isLoadingVideo ? (
                <Spinner color={colors.secondaryColor} />
              ) : (
                <TouchableOpacity
                  style={styles.videoIconContainer}
                  onPress={this.pickImage}
                >
                  <AddVideoIcon />
                </TouchableOpacity>
              )}
              <Text style={styles.introVideoText}>
                {!isLoadingVideo
                  ? t("startupHeader.introVideo")
                  : t("startupHeader.videoUploading")}
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
              <TouchableOpacity onPress={this.onNotificationClick}>
                <Icon name="bell" type="Feather" style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.logoContainer}>
              <SelectImage
                isLogo
                photoUrl={entrepreneurStartups?.logoUrl}
                setImage={() => {
                  this.props.handleFieldEdit(
                    "logoUrl",
                    this.props.dImage,
                    this.props.startup?.id
                  );
                  this.props.handleFieldSave("logoUrl", this.props.startup?.id);
                }}
              />
            </View>
          </View>
          <Text style={styles.startupTitle}>{startup?.name}</Text>
        </View>
        {this.state.isModalOpen && (
          <Modal
            isVisible={this.state.isModalOpen}
            backdropOpacity={0.5}
            onBackButtonPress={() => {}}
          >
            <View style={baseStylesheet.modalView}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontFalily: "montserrat-regular",
                }}
              >
                {t("imageUploaderModal.modalTitle")}
              </Text>
              <View
                style={{
                  padding: 40,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Icon
                  name="image"
                  type="Feather"
                  style={{
                    ...styles.icon,
                    marginRight: 20,
                  }}
                  onPress={() => this.pickImage()}
                />
              </View>
              <Button
                onPress={this.handleClose}
                style={{
                  backgroundColor: colors.lightText,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontFamily: "montserrat-regular",
                  }}
                >
                  {t("imageUploaderModal.cancelButton")}
                </Text>
              </Button>
            </View>
          </Modal>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const dImage = state.fileUploader.image;
  const dVideo = state.fileUploader.video;
  const isLoading = state.fileUploader.isLoading;
  const isLoadingVideo = state.fileUploader.isLoadingVideo;
  const entrepreneurStartups =
    state.startup.entrepreneurStartups && state.startup.entrepreneurStartups[0];
  return {
    dImage,
    dVideo,
    isLoading,
    isLoadingVideo,
    entrepreneurStartups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadFile: (file) => dispatch(uploadFile(file)),
    resetImage: () => dispatch(resetImage()),
    handleFieldEdit: (editingField, text, startupId) =>
      dispatch(handleFieldEdit(editingField, text, startupId)),
    handleFieldSave: (editingField, startupId) =>
      dispatch(handleFieldSave(editingField, startupId)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(StartupHeaderVideoUploader);

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
