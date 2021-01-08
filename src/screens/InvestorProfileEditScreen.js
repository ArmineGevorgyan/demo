import { Container, Content, Icon, Input, Item, Spinner } from "native-base";
import React, { Component } from "react";
import EditProfileHeader from "../components/editProfileHeader";
import { Button, Label, Textarea } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { colors } from "../styles/colors";
import { baseStylesheet } from "../styles/baseStylesheet";
import SelectImage from "../components/selectImage";
import {
  updateProfile,
  getProfileData,
  handleInput,
} from "../redux/ducks/investorProfile";
import { updateUserData } from "../redux/ducks/user";
import schema from "../validation/investorprofileEditSchema";
import { Formik } from "formik";
import Validation from "../validation";
import constants from "../constants";
import LinkedIn from "../../assets/linkedin-rect.svg";
import Crunchbase from "../../assets/crunchbase-rect.svg";
import AngelList from "../../assets/angelList-rect.svg";

class InvestorProfileEditScreen extends Component {
  constructor(props) {
    super(props);
    this.formik = React.createRef();
    this.ref_input2 = React.createRef();
    this.ref_input3 = React.createRef();
    this.ref_input4 = React.createRef();
    this.ref_input5 = React.createRef();
    this.ref_input6 = React.createRef();
    this.ref_input7 = React.createRef();
  }

  componentDidMount() {
    this.props.getProfileData();
  }

  onSubmit = (values) => {
    let arr = values.fullName.split(" ");

    this.props.updateUserData({
      firstName: arr[0],
      lastName: arr[1],
    });
    this.props.updateProfile(values);
  };

  render() {
    const { t, userData, profileData } = this.props;

    if (!profileData || !userData) {
      return <Spinner color={colors.secondaryColor} />;
    }

    return (
      <Container style={{ backgroundColor: colors.offWhite }}>
        <EditProfileHeader
          title={t("investorEditScreen.myProfile")}
          backButtonHandler={() => this.props.navigation.goBack()}
        >
          <SelectImage
            photoUrl={this.props.profileData?.photoUrl}
            setImage={(image) => this.props.handleInput({ photoUrl: image })}
          />
        </EditProfileHeader>
        {this.props.photoError && !this.props.profileData?.photoUrl && (
          <View style={styles.errorContainer}>
            <Icon
              style={styles.alertIcon}
              name="alert-triangle"
              type="Feather"
            />
            <Text style={styles.error}>{t("validator.photo_required")}</Text>
          </View>
        )}
        <Content
          style={{
            backgroundColor: colors.offWhite,
            marginTop: 20,
          }}
        >
          {profileData?.id ? (
            <Formik
              innerRef={(p) => (this.formik = p)}
              initialValues={{
                fullName: `${userData.firstName} ${userData.lastName}`,
                companyName: profileData.companyName || "",
                position: profileData.position || "",
                bio: profileData.bio || "",
                linkedinProfile: profileData.linkedinProfile || "",
                crunchBaseProfile: profileData.crunchBaseProfile || "",
                angelListProfile: profileData.angelListProfile || "",
              }}
              onSubmit={this.onSubmit}
              validationSchema={schema}
            >
              {(props) => {
                const values = props.values;
                let bioLength = values.bio?.length || 0;

                return (
                  <View style={styles.formContainer}>
                    <ValidationInputWrapper
                      title={t("investorEditScreen.fullName")}
                    >
                      <Validation name="fullName" showMessage={true}>
                        <Item
                          rounded
                          style={{
                            ...baseStylesheet.inlineButtonInputItem,
                            marginBottom: 5,
                          }}
                        >
                          <Input
                            returnKeyType="next"
                            blurOnSubmit={false}
                            style={baseStylesheet.inputField}
                            placeholder={t(
                              "investorEditScreen.fullNamePlaceholder"
                            )}
                            placeholderTextColor={colors.blueBorder}
                            value={values.fullName}
                            onChangeText={props.handleChange("fullName")}
                            onSubmitEditing={() =>
                              this.ref_input2._root.focus()
                            }
                          />
                        </Item>
                      </Validation>
                    </ValidationInputWrapper>

                    <ValidationInputWrapper
                      title={t("investorEditScreen.companyName")}
                    >
                      <Validation name="companyName" showMessage={true}>
                        <Item
                          rounded
                          style={{
                            ...baseStylesheet.inlineButtonInputItem,
                            marginBottom: 5,
                          }}
                        >
                          <Input
                            returnKeyType="next"
                            blurOnSubmit={false}
                            ref={(input) => {
                              this.ref_input2 = input;
                            }}
                            style={baseStylesheet.inputField}
                            placeholder={t(
                              "investorEditScreen.companyNamePlaceholder"
                            )}
                            placeholderTextColor={colors.blueBorder}
                            value={values.companyName}
                            onChangeText={props.handleChange("companyName")}
                            onSubmitEditing={() =>
                              this.ref_input3._root.focus()
                            }
                          />
                        </Item>
                      </Validation>
                    </ValidationInputWrapper>

                    <ValidationInputWrapper
                      title={t("investorEditScreen.position")}
                    >
                      <Validation name="position" showMessage={true}>
                        <Item
                          rounded
                          style={{
                            ...baseStylesheet.inlineButtonInputItem,
                            marginBottom: 5,
                          }}
                        >
                          <Input
                            returnKeyType="next"
                            blurOnSubmit={false}
                            ref={(input) => {
                              this.ref_input3 = input;
                            }}
                            style={baseStylesheet.inputField}
                            placeholder={t(
                              "investorEditScreen.positionPlaceholder"
                            )}
                            placeholderTextColor={colors.blueBorder}
                            value={values.position}
                            onChangeText={props.handleChange("position")}
                            onSubmitEditing={() =>
                              this.ref_input4._root.focus()
                            }
                          />
                        </Item>
                      </Validation>
                    </ValidationInputWrapper>

                    <ValidationInputWrapper
                      title={t("investorEditScreen.bio")}
                      length={bioLength}
                      maxLength={constants.investorProfileBioMaxLength}
                    >
                      <Validation name="bio" showMessage={true}>
                        <Textarea
                          bordered
                          rowSpan={5}
                          returnKeyType="next"
                          blurOnSubmit={false}
                          ref={(input) => {
                            this.ref_input4 = input;
                          }}
                          maxLength={constants.investorProfileBioMaxLength}
                          placeholder={t("investorEditScreen.bioPlaceholder")}
                          placeholderTextColor={colors.blueBorder}
                          style={{
                            ...baseStylesheet.textarea,
                            marginTop: 3,
                            marginBottom: 5,
                          }}
                          value={values.bio}
                          onChangeText={props.handleChange("bio")}
                          onSubmitEditing={() => this.ref_input5._root.focus()}
                        />
                      </Validation>
                    </ValidationInputWrapper>

                    <View style={styles.urlInputContainer}>
                      <Validation name="linkedinProfile" showMessage={true}>
                        <Item
                          rounded
                          style={{
                            ...baseStylesheet.inputItem,
                            marginTop: 5,
                            marginBottom: 5,
                            paddingLeft: 20,
                          }}
                        >
                          <LinkedIn />
                          <Input
                            returnKeyType="next"
                            blurOnSubmit={false}
                            ref={(input) => {
                              this.ref_input5 = input;
                            }}
                            style={baseStylesheet.inputField}
                            placeholder={t(
                              "investorEditScreen.linkedInPlaceholder"
                            )}
                            placeholderTextColor={colors.blueBorder}
                            value={values.linkedinProfile}
                            onChangeText={props.handleChange("linkedinProfile")}
                            onSubmitEditing={() =>
                              this.ref_input6._root.focus()
                            }
                          />
                        </Item>
                      </Validation>
                    </View>

                    <View style={styles.urlInputContainer}>
                      <Validation name="crunchBaseProfile" showMessage={true}>
                        <Item
                          rounded
                          style={{
                            ...baseStylesheet.inputItem,
                            marginTop: 5,
                            marginBottom: 5,
                            paddingLeft: 20,
                          }}
                        >
                          <Crunchbase />
                          <Input
                            returnKeyType="next"
                            blurOnSubmit={false}
                            ref={(input) => {
                              this.ref_input6 = input;
                            }}
                            style={baseStylesheet.inputField}
                            placeholder={t(
                              "investorEditScreen.crunchbasePlaceholder"
                            )}
                            placeholderTextColor={colors.blueBorder}
                            value={values.crunchBaseProfile}
                            onChangeText={props.handleChange(
                              "crunchBaseProfile"
                            )}
                            onSubmitEditing={() =>
                              this.ref_input7._root.focus()
                            }
                          />
                        </Item>
                      </Validation>
                    </View>

                    <View style={styles.urlInputContainer}>
                      <Validation name="angelListProfile" showMessage={true}>
                        <Item
                          rounded
                          style={{
                            ...baseStylesheet.inputItem,
                            marginTop: 5,
                            marginBottom: 5,
                            paddingLeft: 20,
                          }}
                        >
                          <AngelList />
                          <Input
                            ref={(input) => {
                              this.ref_input7 = input;
                            }}
                            style={baseStylesheet.inputField}
                            placeholder={t(
                              "investorEditScreen.angelListPlaceholder"
                            )}
                            placeholderTextColor={colors.blueBorder}
                            value={values.angelListProfile}
                            onChangeText={props.handleChange(
                              "angelListProfile"
                            )}
                          />
                        </Item>
                      </Validation>
                    </View>

                    <Button
                      onPress={props.handleSubmit}
                      style={baseStylesheet.mainButton}
                    >
                      <Text style={baseStylesheet.mainButtonText}>
                        {t("investorEditScreen.saveButton")}
                      </Text>
                    </Button>
                  </View>
                );
              }}
            </Formik>
          ) : (
            <Spinner color={colors.secondaryColor} />
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  const userData = state.user.userData;
  const profileData = state.investorProfile.profileData;
  return {
    userData,
    profileData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (values) => dispatch(updateUserData(values)),
    updateProfile: (values) => dispatch(updateProfile(values)),
    getProfileData: () => dispatch(getProfileData()),
    handleInput: (input) => dispatch(handleInput(input)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(InvestorProfileEditScreen);

const styles = StyleSheet.create({
  formContainer: {
    paddingLeft: "5%",
    paddingRight: "5%",
    alignItems: "center",
    width: "100%",
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 15,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  counter: {
    color: colors.darkText,
    fontSize: 10,
    fontFamily: "montserrat-regular",
  },
  urlInputContainer: {
    marginBottom: 5,
    width: "100%",
  },
});

const ValidationInputWrapper = ({ title, length, maxLength, children }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.row}>
        <Label style={baseStylesheet.label}>{title}</Label>
        {length != undefined && (
          <Text style={styles.counter}>
            {length}/{maxLength}
          </Text>
        )}
      </View>
      {children}
    </View>
  );
};
