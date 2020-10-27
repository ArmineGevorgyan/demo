import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { Item, Input, Icon, Button, Content } from "native-base";
import { Formik } from "formik";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import Validation from "../validation";
import { checkEmailStatus } from "../redux/ducks/authentication";
import { openModal } from "../redux/ducks/resendInvite";
import schema from "../validation/authenticationSchema";
import WelcomeHeader from "../components/welcomeHeader";
import ResendInviteModal from "../components/resendInviteModal";
import Background from "../components/background";
import Copyright from "../components/copyright";
import constants from "../constants";

class LandingScreen extends Component {
  componentDidUpdate() {
    const { emailStatus, openModal, navigation } = this.props;
    const isFocused = navigation.isFocused();

    if (!emailStatus) {
      return;
    }

    switch (emailStatus.value) {
      case constants.emailStatus.registered:
        return navigation.navigate("LoginScreen");
      case constants.emailStatus.accepted:
        return isFocused && openModal();
      case constants.emailStatus.requested:
      case constants.emailStatus.rejected:
      case constants.emailStatus.notFound:
        return navigation.navigate("RequestAnInvite");
      default:
    }
  }

  onSubmit = (values) => {
    const { checkEmailStatus } = this.props;
    const email = values.email.trim().toLowerCase();

    checkEmailStatus(email);
  };

  render() {
    const { t } = this.props;

    return (
      <Background>
        <Content>
          <WelcomeHeader />
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
          </View>
          <View style={baseStylesheet.paddedContent}>
            <View>
              <Text style={baseStylesheet.mainContentText}>
                {t("landingScreen.formContext")}
              </Text>
            </View>
            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={this.onSubmit}
              validationSchema={schema}
            >
              {(props) => {
                const values = props.values;
                return (
                  <React.Fragment>
                    <ResendInviteModal />
                    <Validation name="email" showMessage={true}>
                      <Item
                        rounded
                        style={baseStylesheet.inlineButtonInputItem}
                      >
                        <Icon
                          style={baseStylesheet.icon}
                          name="mail"
                          type="Feather"
                        />
                        <Input
                          keyboardType="email-address"
                          style={baseStylesheet.inputField}
                          placeholder={t("landingScreen.emailField")}
                          placeholderTextColor={colors.lightText}
                          value={values.email}
                          onChangeText={props.handleChange("email")}
                        />
                        <View>
                          <Button
                            onPress={props.handleSubmit}
                            style={baseStylesheet.inlineButton}
                          >
                            <Icon
                              style={styles.icon}
                              name="arrow-right"
                              type="Feather"
                            />
                          </Button>
                        </View>
                      </Item>
                    </Validation>
                  </React.Fragment>
                );
              }}
            </Formik>
          </View>
        </Content>
        <Copyright />
      </Background>
    );
  }
}

const mapStateToProps = (state, props) => {
  const emailStatus = state.authentication.emailStatus;
  const emailError = state.authentication.error
    ? state.authentication.error.response
    : null;
  const isAuthenticated = state.authentication.isAuthenticated || false;

  return {
    emailStatus,
    emailError,
    isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkEmailStatus: (email) => dispatch(checkEmailStatus(email)),
    openModal: () => dispatch(openModal()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(LandingScreen);

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    marginTop: -36,
    marginBottom: "9%",
  },
  logo: {
    width: 146,
    height: 150,
  },
  submitButton: {
    minWidth: 30,
  },
  icon: { color: "white", fontSize: 20 },
});
