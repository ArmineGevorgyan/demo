import React, { useRef } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet } from "react-native";
import { Content } from "native-base";
import { withTranslation } from "react-i18next";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

import { showNotification } from "../helpers/notificationHelper";
import { removeHTML } from "../helpers/stringHelper";
import GrayHeader from "../components/grayHeader";
import { colors } from "../styles/colors";
import { baseStylesheet } from "../styles/baseStylesheet";
import { handleFieldEdit } from "../redux/ducks/startup";
import constants from "../constants";

const EditScreen = ({ t, startup, handleFieldEdit }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const richText = useRef(null);

  const { title, id, editingField } = route.params;

  return (
    <Content style={baseStylesheet.baseContainer}>
      <GrayHeader
        title={title}
        backButtonHandler={() => navigation.goBack()}
        editingField={editingField}
        startupId={id}
      />
      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
        ]}
        style={{
          marginBottom: 10,
        }}
        selectedButtonStyle={{
          backgroundColor: colors.disabledText,
        }}
      />
      <RichEditor
        ref={richText}
        initialContentHTML={startup[editingField]}
        onChange={(text) => {
          if (removeHTML(text).length > 2000) {
            showNotification(
              constants.notificationTypes.ERROR,
              `${t("validationMessage.maxNumIs")} ${
                removeHTML(text).length
              } ${t("validationMessage.characters")}`,
              2000
            );
            return;
          }
          handleFieldEdit(editingField, text, id);
        }}
        editorStyle={styles.input}
        initialFocus
      />
    </Content>
  );
};

const mapStateToProps = (state, props) => ({
  startup: state?.startup?.entrepreneurStartups[0],
  //TODO change this to find by startup ids in future
});

const mapDispatchToProps = (dispatch) => ({
  handleFieldEdit: (editingField, text, id) =>
    dispatch(handleFieldEdit(editingField, text, id)),
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(EditScreen);

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 10,
    fontFamily: "montserrat-medium",
    fontSize: 16,
  },
});
