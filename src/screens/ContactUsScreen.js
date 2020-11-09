import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View, Picker } from "react-native";
import { Label, Textarea, Button, Content, Icon } from "native-base";
import { withTranslation } from "react-i18next";
import { Formik } from "formik";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import DraperRhino from "../../assets/draper-rhino.svg";
import GrayHeader from "../components/grayHeader";
import Validation from "../validation";
import schema from "../validation/contactFormSchema";
import constants from "../constants";
import {
  getContactRequestTypes,
  createContactRequest,
  resetForm,
} from "../redux/ducks/contact";

class ContactUsScreen extends Component {
  constructor(props) {
    super(props);
    this.formik = React.createRef();
  }

  componentDidMount() {
    this.props.getContactRequestTypes();
  }

  componentDidUpdate() {
    const { request, navigation, resetForm } = this.props;

    if (!request) {
      return;
    }

    resetForm(); // reset request in the state
    if (this.formik) {
      this.formik.resetForm(); // reset form values
    }
    navigation.navigate("ContactUsSuccess");
  }

  onSubmit = (values) => this.props.createContactRequest(values);

  render() {
    const { t, navigation, requestTypes } = this.props;

    return (
      <Content style={baseStylesheet.baseContainer}>
        <GrayHeader
          title={t("contactUsScreen.headerText")}
          backButtonHandler={() => navigation.goBack()}
        />
        <Formik
          innerRef={(p) => (this.formik = p)}
          initialValues={{
            contactRequestType: { id: 1 },
            message: "",
          }}
          validationSchema={schema}
          onSubmit={this.onSubmit}
        >
          {(props) => {
            let length = props.values.message.length;

            return (
              <View style={styles.formContainer}>
                <View style={styles.imageContainer}>
                  <DraperRhino />
                </View>
                <View style={styles.row}>
                  <Label style={baseStylesheet.label}>
                    {t("contactUsScreen.subject")}
                  </Label>
                </View>
                <View style={[styles.picker, baseStylesheet.inputItem]}>
                  <Icon
                    name="chevron-down"
                    type="Feather"
                    style={styles.pickerIcon}
                  />
                  <Picker
                    selectedValue={props.values.subject}
                    style={{ width: "100%" }}
                    onValueChange={(itemValue, itemIndex) => {
                      props.setFieldValue("contactRequestType", itemValue);
                    }}
                  >
                    {requestTypes &&
                      requestTypes.map((type) => (
                        <Picker.Item label={type.name} value={type} />
                      ))}
                  </Picker>
                </View>
                <View style={styles.message}>
                  <View style={styles.row}>
                    <Label style={baseStylesheet.label}>
                      {t("contactUsScreen.message")}
                    </Label>
                    <Text style={styles.counter}>
                      {length}/{constants.contactUsMessageMaxLength}
                    </Text>
                  </View>
                  <Validation name="message" showMessage={true}>
                    <Textarea
                      maxLength={constants.contactUsMessageMaxLength}
                      rowSpan={7}
                      style={baseStylesheet.textarea}
                      bordered
                      value={props.values.message || ""}
                      onChangeText={props.handleChange("message")}
                    />
                  </Validation>
                </View>
                <Button
                  onPress={props.handleSubmit}
                  style={baseStylesheet.mainButton}
                >
                  <Text style={baseStylesheet.mainButtonText}>
                    {t("contactUsScreen.submitButton")}
                  </Text>
                </Button>
              </View>
            );
          }}
        </Formik>
      </Content>
    );
  }
}

const mapStateToProps = (state, props) => {
  const request = state.contactRequest.request;
  const requestTypes = state.contactRequest.requestTypes;
  return {
    request,
    requestTypes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetForm: () => dispatch(resetForm()),
    getContactRequestTypes: () => dispatch(getContactRequestTypes()),
    createContactRequest: (data) => dispatch(createContactRequest(data)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(ContactUsScreen);

const styles = StyleSheet.create({
  formContainer: {
    padding: 15,
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  picker: { width: "100%", borderRadius: 25, overflow: "hidden" },
  message: { marginBottom: 10, width: "100%" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  counter: {
    color: colors.darkText,
    fontSize: 10,
    fontFamily: "montserrat-regular",
  },
  pickerIcon: {
    color: colors.lightBlue,
    backgroundColor: "white",
    zIndex: 1,
    position: "absolute",
    bottom: 12,
    right: 25,
    fontSize: 25,
  },
});
