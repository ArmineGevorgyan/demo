import React from "react";
import { compose } from "redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { uploadFile } from "../../redux/ducks/fileUploader";
import { handleFieldEdit, handleFieldSave } from "../../redux/ducks/startup";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Content, Spinner } from "native-base";
import { withTranslation } from "react-i18next";
import StartupTextBlock from "../../components/startupTextBlock";
import { baseStylesheet } from "../../styles/baseStylesheet";
import { colors } from "../../styles/colors";
import AddVideoIcon from "../../../assets/video-add.svg";

const EntrepreneurProduct = ({
  startup,
  t,
  navigation,
  uploadFile,
  demoVideo,
  isLoadingDemoVideo,
  handleFieldEdit,
  handleFieldSave,
}) => {
  React.useEffect(() => {
    if (demoVideo) {
      handleFieldEdit("demoVideoUrl", demoVideo, startup?.id);
      handleFieldSave("demoVideoUrl", startup?.id);
    }
  }, [demoVideo]);

  const description = startup?.description,
    customers = startup?.customers,
    pricing = startup?.pricing,
    similarProducts = startup?.similarProducts,
    demoVideoUrl = startup?.demoVideoUrl,
    id = startup?.id;

  const entrepreneurFields = [
    {
      titleText: "description",
      content: description,
    },
    {
      titleText: "customers",
      content: customers,
    },
    {
      titleText: "pricing",
      content: pricing,
    },
    {
      titleText: "similarProducts",
      content: similarProducts,
    },
  ];

  const pickImage = async () => {
    let result;

    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });
    if (!result.cancelled) {
      uploadFile(result, true);
    }
  };

  return (
    <Content
      style={{
        ...baseStylesheet.baseContainer,
        ...baseStylesheet.containerSpacing,
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <Text style={{ ...baseStylesheet.titleText, marginBottom: 10 }}>
          {t("productScreen.demo")}
        </Text>
        <View style={styles.videoIconTextContainer}>
          {isLoadingDemoVideo ? (
            <Spinner color={colors.secondaryColor} />
          ) : (
            <TouchableHighlight
              style={styles.videoIconContainer}
              onPress={pickImage}
            >
              <AddVideoIcon />
            </TouchableHighlight>
          )}
          <Text style={styles.introVideoText}>
            {!isLoadingDemoVideo
              ? demoVideoUrl
                ? t("startupHeader.alreadyUploaded")
                : t("productScreen.addVideoFile")
              : t("startupHeader.videoUploading")}
          </Text>
        </View>
      </View>
      <FlatList
        data={entrepreneurFields}
        renderItem={({ item: { titleText, content }, index }) => (
          <StartupTextBlock
            navigate={navigation.navigate}
            navigateTo="EditScreen"
            fieldName={titleText}
            titleText={`productScreen.${titleText}`}
            content={content}
            id={id}
            isLast={index === entrepreneurFields.length - 1}
          />
        )}
      />
    </Content>
  );
};

const mapStateToProps = (state, props) => {
  const demoVideo = state.fileUploader.demoVideo;
  const isLoadingDemoVideo = state.fileUploader.isLoadingDemoVideo;
  const entrepreneurStartup =
    state.startup.entrepreneurStartups && state.startup.entrepreneurStartups[0];
  return {
    demoVideo,
    isLoadingDemoVideo,
    entrepreneurStartup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadFile: (file, isDemoVideo) => dispatch(uploadFile(file, isDemoVideo)),
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
)(EntrepreneurProduct);

const styles = StyleSheet.create({
  mainText: {
    marginBottom: 10,
    color: colors.darkText,
  },
  plusIcon: {
    color: colors.deepGreen,
    marginRight: 15,
  },
  addProductText: {
    color: colors.darkText,
    fontSize: 16,
    fontFamily: "montserrat-regular",
  },
  addProductContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  videoIconTextContainer: {
    height: 170,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
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
  iconContainer: {
    position: "absolute",
    width: "90%",
    height: 260,
    top: 30,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  introVideoText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "montserrat-regular",
  },
});
