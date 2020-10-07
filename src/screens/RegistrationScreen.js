import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View, Image } from "react-native";
import { Item, Input, Icon, Content, Button } from "native-base";
import { withTranslation } from "react-i18next";
import { Formik } from "formik";
import SwitchSelector from "../components/switchSelector";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import schema from "../validation/registrationSchema";
import Validation from "../validation";
import WelcomeHeader from "../components/welcomeHeader";
import Background from "../components/background";
import constants from "../constants";
import {
  register,
  togglePassword,
  togglePasswordConfirmation,
  getInviteRequest,
} from "../redux/ducks/registration";
import Copyright from "../components/copyright";

class RegistrationScreen extends Component {
  componentDidMount() {
    const { email, token } = this.props.route.params;

    this.props.getInviteRequest(email, token);
  }

  componentDidUpdate(prevProps) {
    const { user, navigation } = this.props;
    const { email, token } = this.props.route.params;

    if (!prevProps.user && user) {
      navigation.navigate("TermsAndConditionsScreen", { email, token });
    }
  }

  onSubmit = (values) => {
    this.props.register(values);
  };

  render() {
    const {
      t,
      isEntrepreneur,
      hidePassword,
      togglePassword,
      hidePasswordConfirmation,
      togglePasswordConfirmation,
    } = this.props;

    const { email, token } = this.props.route.params;

    return (
      <Content style={baseStylesheet.baseContainer}>
        <WelcomeHeader />
        <Background minHeight={constants.blueHeaderContentHeight}>
          <Formik
            initialValues={{
              password: "",
              passwordConfirmation: "",
              firstName: "",
              lastName: "",
              invitationToken: token,
            }}
            onSubmit={this.onSubmit}
            validationSchema={schema}
          >
            {(props) => {
              const values = props.values;
              return (
                <View style={styles.formContainer}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.logo}
                      source={require("../../assets/logo.png")}
                    />
                  </View>
                  <Text style={baseStylesheet.largeHeadingText}>
                    {t("registrationScreen.formHeaderText")}
                  </Text>

                  <SwitchSelector
                    initial={isEntrepreneur}
                    value={isEntrepreneur}
                    options={[
                      {
                        label: t("requestInviteScreen.investor"),
                        value: false,
                      },
                      {
                        label: t("requestInviteScreen.enterpreneur"),
                        value: true,
                      },
                    ]}
                    disabled={true}
                  />
                  <Validation name="firstName" showMessage={true}>
                    <Item rounded style={baseStylesheet.inputItem}>
                      <Icon
                        style={baseStylesheet.icon}
                        name="user"
                        type="Feather"
                      />
                      <Input
                        style={baseStylesheet.inputField}
                        placeholder={t("registrationScreen.firstName")}
                        placeholderTextColor={colors.lightText}
                        value={values.firstName}
                        onChangeText={props.handleChange("firstName")}
                      />
                    </Item>
                  </Validation>
                  <Validation name="lastName" showMessage={true}>
                    <Item rounded style={baseStylesheet.inputItem}>
                      <Icon
                        style={baseStylesheet.icon}
                        name="user"
                        type="Feather"
                      />
                      <Input
                        style={baseStylesheet.inputField}
                        placeholder={t("registrationScreen.lastName")}
                        placeholderTextColor={colors.lightText}
                        value={values.lastName}
                        onChangeText={props.handleChange("lastName")}
                      />
                    </Item>
                  </Validation>
                  <Item rounded style={baseStylesheet.disabledInputItem}>
                    <Icon
                      style={baseStylesheet.icon}
                      name="mail"
                      type="Feather"
                    />
                    <Input
                      style={baseStylesheet.inputField}
                      value={email}
                      disabled={true}
                    />
                  </Item>
                  <Validation name="password" showMessage={true}>
                    <Item rounded style={baseStylesheet.inputItem}>
                      <Icon
                        style={baseStylesheet.icon}
                        name="lock"
                        type="Feather"
                      />
                      <Input
                        style={baseStylesheet.inputField}
                        placeholder={t("registrationScreen.password")}
                        placeholderTextColor={colors.lightText}
                        value={values.password}
                        onChangeText={props.handleChange("password")}
                        secureTextEntry={hidePassword}
                      />
                      <Icon
                        style={baseStylesheet.icon}
                        name={hidePassword ? "eye" : "eye-off"}
                        type="Feather"
                        onPress={() => togglePassword()}
                      />
                    </Item>
                  </Validation>
                  <Validation name="passwordConfirmation" showMessage={true}>
                    <Item rounded style={baseStylesheet.inputItem}>
                      <Icon
                        style={baseStylesheet.icon}
                        name="lock"
                        type="Feather"
                      />
                      <Input
                        style={baseStylesheet.inputField}
                        placeholder={t(
                          "registrationScreen.passwordConfirmation"
                        )}
                        placeholderTextColor={colors.lightText}
                        value={values.passwordConfirmation}
                        onChangeText={props.handleChange(
                          "passwordConfirmation"
                        )}
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
                  <View style={styles.submitButton}>
                    <Button
                      onPress={props.handleSubmit}
                      style={baseStylesheet.mainButton}
                    >
                      <Text style={baseStylesheet.mainButtonText}>
                        {t("registrationScreen.submitButton")}
                        <Icon
                          style={styles.icon}
                          name="arrow-right"
                          type="Feather"
                        />
                      </Text>
                    </Button>
                  </View>
                </View>
              );
            }}
          </Formik>
          <Copyright />
        </Background>
      </Content>
    );
  }
}

const mapStateToProps = (state, props) => {
  const request = state.registration.request;
  const email = request ? request.email : "";
  const isEntrepreneur = request ? (request.isEntrepreneur ? 1 : 0) : 0;
  const user = state.registration.user;
  const hidePassword = state.registration.hidePassword;
  const hidePasswordConfirmation = state.registration.hidePasswordConfirmation;

  return {
    email,
    isEntrepreneur,
    user,
    hidePassword,
    hidePasswordConfirmation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(register(data)),
    getInviteRequest: (email, invitationToken) =>
      dispatch(getInviteRequest(email, invitationToken)),
    togglePassword: () => dispatch(togglePassword()),
    togglePasswordConfirmation: () => dispatch(togglePasswordConfirmation()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(RegistrationScreen);

const styles = StyleSheet.create({
  formContainer: {
    padding: 15,
    alignItems: "center",
    width: "100%",
    marginBottom: 50,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 103,
  },
  submitButton: {
    width: "100%",
  },
  icon: { color: "white", fontSize: 20 },
});
