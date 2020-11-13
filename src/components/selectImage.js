import React, { Component } from "react";
import { View, Platform, Image, Text, StyleSheet } from "react-native";
import { Button, Icon, Spinner } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../styles/colors";
import Modal from "react-native-modal";
import { baseStylesheet } from "../styles/baseStylesheet";
import { uploadFile } from "../redux/ducks/fileUploader";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";

class SelecImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
     if (this.props.dImage !== prevProps.dImage) {
       this.props.setImage(this.props.dImage);
     }
  }

  pickImage = async (type) => {
    let result;
    if (type === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

    if (!result.cancelled) {
      this.props.uploadFile(result);
      this.handleClose();
    }
  };


  showModal = () => {
    this.setState({ isModalOpen: true });
  };

  handleClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      t,
      dImage,
      isLoading,
    } = this.props;
    return (
      <>
        <Button
          rounded
          style={styles.container}
          rounded
          onPress={this.showModal}
        >
          {isLoading ?
            <Spinner color={colors.secondaryColor} /> :
            (this.props.photoUrl) ? (
              <Image
                style={styles.imageContainer}
                source={{ uri: dImage || this.props.photoUrl }}
              />
            ) : (
                <Icon
                  name="user"
                  type="Feather"
                  style={{
                    color: colors.blueBorder,
                    fontSize: 40,
                  }}
                />
              )}
          <View
            style={styles.cameraIconContainer}
          >
            <Icon
              name="camera"
              type="Feather"
              style={{
                color: "#FFFFFF",
                fontSize: 17,
              }}
            />
          </View>
        </Button>
        {this.state.isModalOpen && (
          <Modal
            isVisible={this.state.isModalOpen}
            backdropOpacity={0.5}
            onBackButtonPress={() => this.handleClose()}
          >
            <View style={baseStylesheet.modalView}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontFalily: "montserrat-regular",
                }}
              >{t("imageUploaderModal.modalTitle")}</Text>
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
                  onPress={() => this.pickImage("gallery")}
                />
                <Icon
                  name="camera"
                  type="Feather"
                  style={styles.icon}
                  onPress={() => this.pickImage("camera")}
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
  const isLoading = state.fileUploader.isLoading;
  return {
    dImage,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadFile: (file) => dispatch(uploadFile(file)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(SelecImage);

const styles = StyleSheet.create({
  container: {
    width: 96,
    height: 96,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#FFF",
    flexDirection: "column",
    justifyContent: "center",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "contain",
  },
  cameraIconContainer: {
    width: "100%",
    height: 25,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.53)",
  },
  icon: {
    color: "#FFF",
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.darkBlue,
  },
});
