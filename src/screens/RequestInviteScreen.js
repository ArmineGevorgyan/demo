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
import schema from "../validation/requestInviteSchema";
import Validation from "../validation";
import WelcomeHeader from "../components/welcomeHeader";
import Background from "../components/background";
import constants from "../constants";
import { requestInvite } from "../redux/ducks/requestInvite";

class RequestInviteScreen extends Component {
  componentDidUpdate(prevProps) {
    const { request, navigation } = this.props;

    if (!prevProps.request && request) {
      navigation.pop();
      navigation.navigate("RequestInviteSuccess");
    }
  }

  onSubmit = (values) => {
    const { requestInvite } = this.props;

    return requestInvite(values);
  };

  render() {
    const { t, email } = this.props;
    return (
        <Background>
          <Content>
          <WelcomeHeader />
          <Formik
            initialValues={{
              email: email,
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
                <View style={styles.formContainer}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.logo}
                      source={require("../../assets/logo.png")}
                    />
                  </View>
                  <Text style={baseStylesheet.largeHeadingText}>
                    {t("requestInviteScreen.formHeaderText")}
                  </Text>

                  <SwitchSelector
                    initial={0}
                    onPress={() =>
                      (values.isEntrepreneur = !values.isEntrepreneur)
                    }
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
                  />
                  <Validation name="email" showMessage={true}>
                    <Item rounded style={baseStylesheet.disabledInputItem}>
                      <Icon
                        style={baseStylesheet.icon}
                        name="mail"
                        type="Feather"
                      />
                      <Input
                        style={baseStylesheet.inputField}
                        placeholder={t("requestInviteScreen.emailField")}
                        placeholderTextColor={colors.lightText}
                        value={values.email}
                        disabled={true}
                      />
                    </Item>
                  </Validation>
                  <Validation name="linkedinProfile" showMessage={true}>
                    <Item rounded style={baseStylesheet.inputItem}>
                      <Icon
                        style={baseStylesheet.icon}
                        name="linkedin"
                        type="Feather"
                      />
                      <Input
                        style={baseStylesheet.inputField}
                        placeholder={t("requestInviteScreen.linkedinProfile")}
                        placeholderTextColor={colors.lightText}
                        value={values.linkedinProfile}
                        onChangeText={props.handleChange("linkedinProfile")}
                      />
                    </Item>
                  </Validation>
                  <Validation name="angelListProfile" showMessage={true}>
                    <Item rounded style={baseStylesheet.inputItem}>
                      <Icon
                        style={baseStylesheet.icon}
                        name="angellist"
                        type="FontAwesome"
                      />
                      <Input
                        style={baseStylesheet.inputField}
                        placeholder={t("requestInviteScreen.angelListProfile")}
                        placeholderTextColor={colors.lightText}
                        value={values.angelListProfile}
                        onChangeText={props.handleChange("angelListProfile")}
                      />
                    </Item>
                  </Validation>

                  <View style={styles.submitButton}>
                    <Button
                      onPress={props.handleSubmit}
                      style={baseStylesheet.mainButton}
                    >
                      <Text style={baseStylesheet.mainButtonText}>
                        {t("requestInviteScreen.submitButton")}
                      </Text>
                    </Button>
                  </View>
                </View>
              );
            }}
          </Formik>
          </Content>
        </Background>
    );
  }
}

const mapStateToProps = (state, props) => {
  const email = state.authentication.email;
  const request = state.requestInvite.request;
  return { email, request };
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
});
