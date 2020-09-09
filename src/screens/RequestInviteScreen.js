import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Item, Input } from "native-base";
import { withTranslation } from "react-i18next";
import { Formik } from "formik";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import schema from "../validation/requestInviteSchema";
import Validation from "../validation";
import { requestInvite } from "../redux/ducks/requestInvite";

class RequestInviteScreen extends Component {
  onSubmit = (values) => {
    const { requestInvite } = this.props;

    return requestInvite(values);
  };

  render() {
    const { t } = this.props;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"} // comment this out when testing in the web browser, otherwise you will get a "Platform is not defined" error
        style={baseStylesheet.baseContainer}
      >
        <Formik
          initialValues={{
            email: "",
            linkedinProfile: "",
            angelListProfile: "",
            isEntrepreneur: false,
          }}
          onSubmit={this.onSubmit}
          validationSchema={schema}
        >
          {(props) => {
            const values = props.values;
            return (
              <View
                style={[baseStylesheet.baseContainer, styles.formContainer]}
              >
                <Text style={baseStylesheet.mainContentText}>
                  {t("requestInviteScreen.formHeaderText")}
                </Text>

                <SwitchSelector
                  style={[styles.switchSelector]}
                  initial={0}
                  onPress={() =>
                    (values.isEntrepreneur = !values.isEntrepreneur)
                  }
                  textColor={colors.darkText}
                  selectedColor={colors.lightText}
                  buttonColor={colors.mainButton}
                  borderColor={colors.secondaryColor}
                  hasPadding
                  options={[
                    { label: t("requestInviteScreen.investor"), value: false },
                    {
                      label: t("requestInviteScreen.enterpreneur"),
                      value: true,
                    },
                  ]}
                />

                <Validation name="email" showMessage={true}>
                  <Item style={styles.inputField}>
                    <Input
                      placeholder={t("requestInviteScreen.emailField")}
                      value={values.email}
                      onChangeText={props.handleChange("email")}
                    />
                  </Item>
                </Validation>
                <Validation name="linkedinProfile" showMessage={true}>
                  <Item style={styles.inputField}>
                    <Input
                      placeholder={t("requestInviteScreen.linkedinProfile")}
                      value={values.linkedinProfile}
                      onChangeText={props.handleChange("linkedinProfile")}
                    />
                  </Item>
                </Validation>
                <Validation name="angelListProfile" showMessage={true}>
                  <Item style={styles.inputField}>
                    <Input
                      placeholder={t("requestInviteScreen.angelListProfile")}
                      value={values.angelListProfile}
                      onChangeText={props.handleChange("angelListProfile")}
                    />
                  </Item>
                </Validation>

                <View style={[styles.inputField, styles.submitButton]}>
                  <TouchableOpacity onPress={props.handleSubmit}>
                    <Text style={baseStylesheet.mainButton}>
                      {t("requestInviteScreen.submitButton")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        </Formik>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestInvite: (data) => dispatch(requestInvite(data)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(RequestInviteScreen);

const styles = StyleSheet.create({
  formContainer: {
    padding: 15,
    alignItems: "center",
    width: "100%",
  },
  inputField: {
    width: "90%",
    marginBottom: 10,
  },
  toggleField: {
    width: "85%",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toggleOption: {
    fontSize: 17,
    color: colors.mainText,
  },
  submitButton: {
    marginTop: 20,
  },
  switchSelector: {
    width: "90%",
    marginBottom: 20,
  },
});
