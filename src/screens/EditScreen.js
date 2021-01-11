import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Content, Input } from "native-base";
import { withTranslation } from "react-i18next";

import { useNavigation, useRoute } from "@react-navigation/native";
import GrayHeader from '../components/grayHeader';
import constants from "../constants";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import {
  handleFieldEdit
} from "../redux/ducks/startup";

const EditScreen = ({ t, fieldValue, handleFieldEdit }) => {
  const navigation = useNavigation();
  const route = useRoute();
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
        style={{...baseStylesheet.inputField, width: "100%"}}
        value={fieldValue}
        onChangeText={text => handleFieldEdit(editingField, text, id)}
        maxLength={2000}
      />
    </Content>
  );
}

const mapStateToProps = (state, props) => ({
  fieldValue: state?.startups?.entrepreneurStartups[0]
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
  mainText: {
    marginBottom: 10,
    fontSize: 14,
    fontFamily: "montserrat-regular",
  },
  titleText: {
    fontSize: 20,
    fontFamily: "montserrat-bold",
    marginBottom: 10,
  },
  noteText: {
    fontSize: 14,
    color: colors.darkText,
    fontFamily: "montserrat-regular",
    marginBottom: 20,
  },
});
