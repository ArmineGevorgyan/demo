import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Item, Input, Icon, Content } from "native-base";
import { Formik } from "formik";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import Validation from "../validation";
import { checkEmailStatus } from "../redux/ducks/authentication";
import schema from "../validation/authenticationSchema";
import WelcomeHeader from "../components/welcomeHeader";
import Background from "../components/background";
import Copyright from "../components/copyright";
import constants from "../constants";

class LandingScreen extends Component {
  componentDidUpdate(prevProps) {
    const { emailStatus } = this.props;

    if (!emailStatus) {
      return;
    }

    switch (emailStatus.value) {
      case "REGISTERED":
        // TODO: navigate to the login screen
        break;
      case "ACCEPTED":
        // TODO: navigate to the registration screen
        break;
      case "REQUESTED":
        // TODO: show "Resend invitation link" popup
        break;
      case "REJECTED":
        // TODO: handle REJECTED case
        break;
      case "NOT_FOUND":
        return this.props.navigation.navigate("RequestAnInvite");
      default:
    }
  }

  onSubmit = (values) => {
    const { checkEmailStatus } = this.props;

    checkEmailStatus(values.email);
  };

  render() {
    const { t } = this.props;

    return (
      <Content style={baseStylesheet.baseContainer}>
        <WelcomeHeader />
        <Background minHeight={constants.blueHeaderContentHeight}>
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
                  <Validation name="email" showMessage={true}>
                    <Item rounded style={baseStylesheet.inlineButtonInputItem}>
                      <Icon
                        style={baseStylesheet.icon}
                        name="mail"
                        type="Feather"
                      />
                      <Input
                        style={baseStylesheet.inputField}
                        placeholder={t("landingScreen.emailField")}
                        placeholderTextColor={colors.lightText}
                        value={values.email}
                        onChangeText={props.handleChange("email")}
                      />
                      <View style={styles.submitButton}>
                        <TouchableOpacity onPress={props.handleSubmit}>
                          <Text style={baseStylesheet.inlineButton}>
                            <Icon
                              style={styles.icon}
                              name="arrow-right"
                              type="Feather"
                            />
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Item>
                  </Validation>
                );
              }}
            </Formik>
          </View>
          <Copyright />
        </Background>
      </Content>
    );
  }
}

const mapStateToProps = (state, props) => {
  const emailStatus = state.authentication.emailStatus;
  const emailError = state.authentication.error
    ? state.authentication.error.response
    : null;

  return {
    emailStatus,
    emailError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkEmailStatus: (email) => dispatch(checkEmailStatus(email)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(LandingScreen);

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    marginTop: "-10%",
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
