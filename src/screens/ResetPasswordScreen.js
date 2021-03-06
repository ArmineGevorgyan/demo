import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View } from "react-native";
import { Label, Item, Input, Button, Content, Icon } from "native-base";
import { withTranslation } from "react-i18next";
import { Formik } from "formik";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import DWG from "../../assets/DWG.svg";
import GrayHeader from "../components/grayHeader";
import Validation from "../validation";
import schema from "../validation/resetPasswordSchema";
import {
  resetPassword,
  togglePassword,
  togglePasswordConfirmation,
  checkResetToken,
} from "../redux/ducks/resetPassword";
import { showNotification } from "../helpers/notificationHelper";

class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.ref_input1 = React.createRef();
    this.ref_input2 = React.createRef();
  }

  componentDidMount() {
    this.props.checkResetToken({ value: this.props.route.params?.resetKey });
  }

  componentDidUpdate(prevProps) {
    const { success, navigation, validToken, isAuthenticated } = this.props;

    if (!validToken) {
      return;
    }

    if (!validToken.value) {
      showNotification("error", "notification.invalidResetToken");

      navigation.reset({
        index: 0,
        routes: [{ name: isAuthenticated ? "Home" : "LandingScreen" }],
      });
    }

    if (success && !prevProps.success) {
      navigation.navigate("ResetPasswordSuccess", { isAuthenticated });
    }
  }

  onSubmit = (values) => {
    this.props.resetPassword(values);
  };

  render() {
    const {
      t,
      hidePassword,
      togglePassword,
      hidePasswordConfirmation,
      togglePasswordConfirmation,
    } = this.props;

    return (
      <Content style={baseStylesheet.baseContainer}>
        <GrayHeader title={t("resetPasswordScreen.headerText")} />
        <Formik
          innerRef={(p) => (this.formik = p)}
          initialValues={{
            newPassword: "",
            passwordConfirmation: "",
            key: this.props.route.params?.resetKey,
          }}
          validationSchema={schema}
          onSubmit={this.onSubmit}
        >
          {(props) => {
            const values = props.values;

            return (
              <View style={styles.formContainer}>
                <View style={styles.imageContainer}>
                  <DWG />
                </View>
                <View style={styles.row}>
                  <Label style={baseStylesheet.label}>
                    {t("resetPasswordScreen.password")}
                  </Label>
                </View>
                <Validation name="newPassword" showMessage={true}>
                  <Item rounded style={baseStylesheet.inputItem}>
                    <Icon
                      style={baseStylesheet.icon}
                      name="lock"
                      type="Feather"
                    />
                    <Input
                      returnKeyType="next"
                      blurOnSubmit={false}
                      ref={(input) => {
                        this.ref_input1 = input;
                      }}
                      style={baseStylesheet.inputField}
                      placeholder={t("resetPasswordScreen.passwordPlaceholder")}
                      placeholderTextColor={colors.lightText}
                      value={values.newPassword}
                      onChangeText={props.handleChange("newPassword")}
                      secureTextEntry={hidePassword}
                      onSubmitEditing={() => this.ref_input2._root.focus()}
                    />
                    <Icon
                      style={baseStylesheet.icon}
                      name={hidePassword ? "eye" : "eye-off"}
                      type="Feather"
                      onPress={() => togglePassword()}
                    />
                  </Item>
                </Validation>
                <View style={styles.row}>
                  <Label style={baseStylesheet.label}>
                    {t("resetPasswordScreen.passwordConfirmation")}
                  </Label>
                </View>
                <Validation name="passwordConfirmation" showMessage={true}>
                  <Item rounded style={baseStylesheet.inputItem}>
                    <Icon
                      style={baseStylesheet.icon}
                      name="lock"
                      type="Feather"
                    />
                    <Input
                      ref={(input) => {
                        this.ref_input2 = input;
                      }}
                      style={baseStylesheet.inputField}
                      placeholder={t(
                        "resetPasswordScreen.passwordConfirmationPlaceholder"
                      )}
                      placeholderTextColor={colors.lightText}
                      value={values.passwordConfirmation}
                      onChangeText={props.handleChange("passwordConfirmation")}
                      secureTextEntry={hidePasswordConfirmation}
                    />
                    <Icon
                      style={baseStylesheet.icon}
                      name={hidePasswordConfirmation ? "eye" : "eye-off"}
                      type="Feather"
                      onPress={() => togglePasswordConfirmation()}
                    />
                  </Item>
                </Validation>
                <Button
                  onPress={props.handleSubmit}
                  style={[baseStylesheet.deepGreenButton, styles.submitButton]}
                >
                  <Text style={baseStylesheet.mainButtonText}>
                    {t("resetPasswordScreen.submitButton")}
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
  const hidePassword = state.resetPassword.hidePassword;
  const hidePasswordConfirmation = state.resetPassword.hidePasswordConfirmation;
  const success = state.resetPassword.success;
  const validToken = state.resetPassword.validToken;
  const isAuthenticated = state.authentication.isAuthenticated;

  return {
    hidePassword,
    hidePasswordConfirmation,
    success,
    validToken,
    isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkResetToken: (token) => dispatch(checkResetToken(token)),
    resetPassword: (data) => dispatch(resetPassword(data)),
    togglePassword: () => dispatch(togglePassword()),
    togglePasswordConfirmation: () => dispatch(togglePasswordConfirmation()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(ResetPasswordScreen);

const styles = StyleSheet.create({
  formContainer: {
    padding: 15,
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  row: {
    width: "100%",
    marginTop: 20,
  },
  submitButton: {
    marginTop: 40,
  },
});
