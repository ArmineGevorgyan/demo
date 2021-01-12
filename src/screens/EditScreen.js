import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Content, Textarea } from "native-base";
import { withTranslation } from "react-i18next";
import { useNavigation, useRoute } from "@react-navigation/native";

import GrayHeader from '../components/grayHeader';
import { baseStylesheet } from "../styles/baseStylesheet";
import {
  handleFieldEdit
} from "../redux/ducks/startup";

const EditScreen = ({ t, startup, handleFieldEdit }) => {
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Textarea
          rowSpan={20}
          maxLength={2000}
          style={styles.textarea}
          value={startup && startup[editingField]}
          onChangeText={text => handleFieldEdit(editingField, text, id)}
        />
      </KeyboardAvoidingView>
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
  textarea: {
    marginTop: 20,
    flex: 1,
    marginHorizontal: 10,
    fontFamily: "montserrat-medium",
    fontSize: 16
  }
});
