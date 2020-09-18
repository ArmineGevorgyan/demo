import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Item, Input, Icon } from "native-base";
import { Formik } from "formik";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import Validation from "../validation";
import { checkEmailStatus } from "../redux/ducks/authentication";
import schema from "../validation/authenticationSchema";

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
      <KeyboardAvoidingView style={baseStylesheet.baseContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.weclomeText}>
            {t("landingScreen.weclomeTitle")}
          </Text>
          <View style={styles.subtitleContainer}>
            <Text style={[styles.subtitleText, styles.boldText]}>
              {t("landingScreen.Draper") + " "}
            </Text>
            <Text style={styles.subtitleText}>{t("landingScreen.Rhino")}</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
          />
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
        <View style={styles.copyrightContainer}>
          <Text style={styles.copyright}>{t("landingScreen.copyright")}</Text>
        </View>
      </KeyboardAvoidingView>
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
  welcomeContainer: {
    justifyContent: "flex-end",
    marginTop: 50,
    marginBottom: 20,
    alignItems: "center",
  },
  weclomeText: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "sans-serif-light",
    color: colors.mainText,
  },
  subtitleText: {
    fontSize: 34,
    textAlign: "center",
    fontFamily: "sans-serif-light",
    color: colors.mainText,
  },
  subtitleContainer: {
    flexDirection: "row",
  },
  boldText: {
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 155,
  },
  submitButton: {
    minWidth: 30,
  },
  copyrightContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainColor,
    marginTop: 100,
  },
  copyright: {
    textAlign: "center",
    color: colors.lightText,
  },
  icon: { color: "white", fontSize: 20 },
});
