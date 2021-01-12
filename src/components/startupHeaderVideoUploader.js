import React, { Component } from "react";
import { Keyboard } from "react-native";
import { View, Icon, Spinner, Input } from "native-base";
import { withTranslation } from "react-i18next";
import { uploadFile, resetImage } from "../redux/ducks/fileUploader";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
} from "react-native";
import constants from "../constants";
import AddVideoIcon from "../../assets/video-add.svg";
import SelectImage from "./selectImage";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../styles/colors";
import Modal from "react-native-modal";
import { baseStylesheet } from "../styles/baseStylesheet";
import {
  handleFieldEdit,
  handleFieldSave,
  handleStartupName,
} from "../redux/ducks/startup";
import { showNotification } from "../helpers/notificationHelper";

class StartupHeaderVideoUploader extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      isFavorite: false,
      image: null,
      isModalOpen: false,
      startupName: "",
    };
  }

  componentDidMount() {
    Keyboard.addListener("keyboardDidHide", this.unBlurInputs);
    if (this.props.startup?.name) {
      this.setState({ startupName: this.props.startup?.name });
    }

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

  unBlurInputs = () => {
    this.inputRef?._root?.blur();
  };

  componentDidUpdate(prevProps) {
    if (this.props.dVideo !== prevProps.dVideo) {
      this.props.updateStartup("introVideoUrl", this.props.dVideo);
      showNotification("success", "Successfully uploaded");
    }
    if (
      this.props.entrepreneurStartup?.name !== this.props.startupName &&
      this.props.entrepreneurStartup?.name !== ""
    ) {
      this.setState({ startupName: this.props.entrepreneurStartup?.name });
      this.props.handleStartupName(this.props.entrepreneurStartup?.name);
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
    const { t, startup, isLoadingVideo, entrepreneurStartup } = this.props;

    return (
      <>
        <View
          style={{
            height: constants.startupHeaderHeight,
          }}
        >
          <View style={styles.container}></View>
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
            <View style={styles.videoIconTextContainer}>
              {isLoadingVideo ? (
                <Spinner color={colors.secondaryColor} />
              ) : (
                <TouchableHighlight
                  style={styles.videoIconContainer}
                  onPress={this.pickImage}
                >
                  <AddVideoIcon />
                </TouchableHighlight>
              )}
              <Text style={styles.introVideoText}>
                {!isLoadingVideo
                  ? entrepreneurStartup?.introVideoUrl
                    ? t("startupHeader.alreadyUploaded")
                    : t("startupHeader.introVideo")
                  : t("startupHeader.videoUploading")}
              </Text>
            </View>
            <View style={styles.logoContainer}>
              <SelectImage
                isLogo
                photoUrl={startup?.logoUrl}
                setImage={() => {
                  this.props.updateStartup("logoUrl", this.props.dImage);
                }}
              />
            </View>
          </View>
          <Input
            blurOnSubmit
            ref={(input) => {
              this.inputRef = input;
            }}
            style={styles.startupTitle}
            value={this.state.startupName}
            placeholder="Startup name"
            placeholderTextColor="rgba(0,0,0,0.3)"
            onChangeText={(text) => this.setState({ startupName: text })}
            onBlur={() => {
              this.props.updateStartup("name", this.state.startupName);
            }}
          />
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
  const startupName = state.startup.startupName;
  const dImage = state.fileUploader.image;
  const dVideo = state.fileUploader.video;
  const isLoading = state.fileUploader.isLoading;
  const isLoadingVideo = state.fileUploader.isLoadingVideo;
  const entrepreneurStartup =
    state.startup.entrepreneurStartups && state.startup.entrepreneurStartups[0];
  return {
    startupName,
    dImage,
    dVideo,
    isLoading,
    isLoadingVideo,
    entrepreneurStartup,
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
    handleStartupName: (name) => dispatch(handleStartupName(name)),
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
    textAlign: "center",
    fontFamily: "montserrat-regular",
  },
  startupTitle: {
    paddingTop: 5,
    marginLeft: 115,
    fontSize: 20,
    color: "#262F3E",
    fontFamily: "montserrat-medium",
  },
});
