import React, { useRef } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  StyleSheet,
} from "react-native";
import { Content, Input } from "native-base";
import { withTranslation } from "react-i18next";

import { useNavigation, useRoute } from "@react-navigation/native";
import GrayHeader from '../components/grayHeader';
import constants from "../constants";
import { baseStylesheet } from "../styles/baseStylesheet";
import {
  handleFieldEdit
} from "../redux/ducks/startup";

const { windowHeight, windowWidth, headerHeight } = constants;

const EditScreen = ({ t, startup, handleFieldEdit }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const inputRef = useRef(null);
  const { title, id, editingField } = route.params;

  return (
    <Content
      style={baseStylesheet.baseContainer}
    >
      <GrayHeader
        title={title}
        backButtonHandler={() => navigation.goBack()}
        editingField={editingField}
        startupId={id}
      />
      <Input
        style={[baseStylesheet.inputField, styles.input]}
        value={startup[editingField]}
        onChangeText={text => handleFieldEdit(editingField, text, id)}
        multiline={true}
        maxLength={2000}
      />
    </Content>
  );
}

const mapStateToProps = (state, props) => ({
  startup: state?.startup?.entrepreneurStartups[0]
  //TODO change this to find by startup ids in future
});

const mapDispatchToProps = (dispatch) => ({
  handleFieldEdit: (editingField, text, id) => dispatch(handleFieldEdit(editingField, text, id))
});

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(EditScreen);

const styles = StyleSheet.create({
  input: {
    width: windowWidth-20, //30 - horizontal paddings
    height: windowHeight-headerHeight,
    textAlignVertical: "top",
    marginTop: 20,
    marginHorizontal: 10,
    fontFamily: "montserrat-medium",
    fontSize: 16
  }
});
