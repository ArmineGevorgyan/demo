import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View, Image } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Item, Input, Icon, Content } from "native-base";
import { withTranslation } from "react-i18next";
import { Formik } from "formik";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import schema from "../validation/requestInviteSchema";
import Validation from "../validation";
import { requestInvite } from "../redux/ducks/requestInvite";
import WelcomeHeader from "../components/welcomeHeader";
import Background from "../components/background";
import constants from "../constants";

class RequestInviteScreen extends Component {
  onSubmit = (values) => {
    const { requestInvite } = this.props;

    return requestInvite(values);
  };

  render() {
    const { t } = this.props;

    return (
      <Content style={baseStylesheet.baseContainer}>
        <WelcomeHeader />
        <Background minHeight={constants.blueHeaderContentHeight}>
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
                    style={[styles.switchSelector]}
                    initial={0}
                    onPress={() =>
                      (values.isEntrepreneur = !values.isEntrepreneur)
                    }
                    textColor={colors.darkText}
                    selectedColor={colors.mainButtonText}
                    buttonColor={colors.mainButton}
                    borderColor={colors.lightBorder}
                    height={50}
                    fontSize={15}
                    hasPadding
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
                    <Item rounded style={baseStylesheet.inputItem}>
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
                        onChangeText={props.handleChange("email")}
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
        </Background>
      </Content>
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
  switchSelector: {
    marginBottom: 25,
    width: "100%",
    height: 30,
  },
});
