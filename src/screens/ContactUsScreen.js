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

class ContactUsScreen extends Component {
  onSubmit = (values) => {};

  render() {
    const { t, navigation } = this.props;

    return (
      <Content style={baseStylesheet.baseContainer}>
        <GrayHeader
          title={t("contactUsScreen.headerText")}
          backButtonHandler={() => navigation.goBack()}
        />

        <Formik
          initialValues={{
            subject: "bug",
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
                  <DraperRhino style={styles.draperRhinoImage} />
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
                      props.setFieldValue("subject", itemValue);
                    }}
                  >
                    <Picker.Item label={t("contactUsScreen.bug")} value="bug" />
                    <Picker.Item
                      label={t("contactUsScreen.complaint")}
                      value="complaint"
                    />
                    <Picker.Item
                      label={t("contactUsScreen.suggestion")}
                      value="suggestion"
                    />
                    <Picker.Item
                      label={t("contactUsScreen.other")}
                      value="other"
                    />
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
  const email = state.authentication.email;
  return {
    email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
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
  submitButton: {
    width: "100%",
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
