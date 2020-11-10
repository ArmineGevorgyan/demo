import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View } from "react-native";
import { Label, Item, Input, Button, Content, Icon } from "native-base";
import { withTranslation } from "react-i18next";
import { Formik } from "formik";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import DraperRhino from "../../assets/draper-rhino.svg";
import GrayHeader from "../components/grayHeader";
import Validation from "../validation";
import schema from "../validation/emailSchema";
import { getResetLink, openModal } from "../redux/ducks/resetPassword";
import ResetPasswordModal from "../components/resetPasswordModal";
import ResetImg from "../../assets/reset.svg";
import constants from "../constants";

class ForgotPasswordScreen extends Component {
  componentDidUpdate() {
    const { emailSent, openModal, error } = this.props;

    if (!emailSent && !error) {
      return;
    }

    openModal();
  }

  onSubmit = (values) => this.props.getResetLink(values);

  render() {
    const { t, navigation, isAuthenticated, error } = this.props;

    return (
      <Content style={baseStylesheet.baseContainer}>
        <GrayHeader
          title={
            isAuthenticated
              ? t("forgotPasswordScreen.resetPassword")
              : t("forgotPasswordScreen.forgotPassword")
          }
          backButtonHandler={() => navigation.goBack()}
        />
        <Formik
          innerRef={(p) => (this.formik = p)}
          initialValues={{
            email: "",
          }}
          validationSchema={schema}
          onSubmit={this.onSubmit}
        >
          {(props) => {
            const values = props.values;

            return (
              <View style={styles.formContainer}>
                <ResetPasswordModal email={values.email} error={error} />
                <View style={styles.imageContainer}>
                  <DraperRhino />
                </View>
                <View style={styles.textRow}>
                  <ResetImg />
                  <View style={styles.content}>
                    <Text style={[baseStylesheet.mainContentText, styles.text]}>
                      {t("forgotPasswordScreen.content")}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Label style={baseStylesheet.label}>
                    {t("forgotPasswordScreen.emailField")}
                  </Label>
                </View>
                <Validation name="email" showMessage={true}>
                  <Item rounded style={baseStylesheet.inputItem}>
                    <Icon
                      style={baseStylesheet.icon}
                      name="mail"
                      type="Feather"
                    />
                    <Input
                      style={baseStylesheet.inputField}
                      placeholder={t("forgotPasswordScreen.emailField")}
                      placeholderTextColor={colors.lightText}
                      value={values.email}
                      onChangeText={props.handleChange("email")}
                    />
                  </Item>
                </Validation>
                <Button
                  onPress={props.handleSubmit}
                  style={[baseStylesheet.mainButton, styles.submitButton]}
                >
                  <Text style={baseStylesheet.mainButtonText}>
                    {t("forgotPasswordScreen.submitButton")}
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
  const isAuthenticated = state.authentication.isAuthenticated;
  const emailSent = state.resetPassword.emailSent;
  const error = state.resetPassword.error;

  return {
    isAuthenticated,
    emailSent,
    error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getResetLink: (data) => dispatch(getResetLink(data)),
    openModal: () => dispatch(openModal()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(ForgotPasswordScreen);

const styles = StyleSheet.create({
  formContainer: {
    padding: 15,
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  row: {
    width: "100%",
    marginTop: 20,
  },
  submitButton: {
    marginTop: 40,
    width: constants.windowWidth - 40,
  },
  content: { width: "90%" },
  text: { fontSize: 14, paddingLeft: 10 },
  textRow: {
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 40,
    marginBottom: 10,
  },
});
