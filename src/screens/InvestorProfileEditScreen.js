import { Container, Content, Icon, Input, Item, Spinner } from "native-base";
import React, { Component } from "react";
import ProfileBlueHeader from "../components/profileBlueHeader";
import { Button, Label, Textarea } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { colors } from "../styles/colors";
import { baseStylesheet } from "../styles/baseStylesheet";
import SelectImage from "../components/selectImage";
import {
  save,
} from "../redux/ducks/investorProfile";
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
  };

  onSubmit = (values) => {
    console.log("values ===================================   ", values);
  };

  render() {
    const {
      t,
      userData,
      profileData,
    } = this.props;

    return (
      <Container style={{ backgroundColor: colors.offWhite, }}>
        <ProfileBlueHeader
          title={t("investorEditScreen.myProfile")}
          backButtonHandler={() => this.props.navigation.goBack()}
        >
          <SelectImage
            photoUrl={this.props.profileData?.photoUrl}
            setImage={
              (image) => this.setTextInput({ photoUrl: image })
            }
          />
        </ProfileBlueHeader>
        {
          this.props.photoError && !this.props.profileData.photoUrl &&
          (
            <View style={styles.errorContainer}>
              <Icon
                style={styles.alertIcon}
                name="alert-triangle"
                type="Feather"
              />
              <Text style={styles.error}>
                {t("validator.photo_required")}
              </Text>
            </View>
          )
        }
        <Content
          style={{
            backgroundColor: colors.offWhite,
            marginTop: 20,
          }}
        >
          <Formik
            innerRef={(p) => (this.formik = p)}
            initialValues={{
              fullName: `${userData.firstName} ${userData.lastName}`,
              companyName: profileData.companyName || "",
              position: profileData.position || "",
              bio: profileData.bio || "",
              linkedIn: profileData.linkedIn || "",
              crunchbase: profileData.crunchbase || "",
              angelList: profileData.angelList || "",
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
                          style={baseStylesheet.inputField}
                          placeholder={t("investorEditScreen.fullNamePlaceholder")}
                          placeholderTextColor={colors.blueBorder}
                          value={values.fullName}
                          onChangeText={props.handleChange("fullName")}
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
                          style={baseStylesheet.inputField}
                          placeholder={t("investorEditScreen.companyNamePlaceholder")}
                          placeholderTextColor={colors.blueBorder}
                          value={values.companyName}
                          onChangeText={props.handleChange("companyName")}
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
                          style={baseStylesheet.inputField}
                          placeholder={t("investorEditScreen.positionPlaceholder")}
                          placeholderTextColor={colors.blueBorder}
                          value={values.position}
                          onChangeText={props.handleChange("position")}
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
                      />
                    </Validation>
                  </ValidationInputWrapper>

                  <View style={styles.urlInputContainer}>
                    <Validation name="linkedIn" showMessage={true}>
                      <Item rounded style={{
                        ...baseStylesheet.inputItem,
                        marginTop: 5,
                        marginBottom: 5,
                        paddingLeft: 20,
                      }}
                      >
                        <LinkedIn />
                        <Input
                          style={baseStylesheet.inputField}
                          placeholder={t("investorEditScreen.linkedInPlaceholder")}
                          placeholderTextColor={colors.blueBorder}
                          value={values.linkedIn}
                          onChangeText={props.handleChange("linkedIn")}
                        />
                      </Item>
                    </Validation>
                  </View>

                  <View style={styles.urlInputContainer}>
                    <Validation name="crunchbase" showMessage={true}>
                      <Item rounded style={{
                        ...baseStylesheet.inputItem,
                        marginTop: 5,
                        marginBottom: 5,
                        paddingLeft: 20,
                      }}
                      >
                        <Crunchbase />
                        <Input
                          style={baseStylesheet.inputField}
                          placeholder={t("investorEditScreen.crunchbasePlaceholder")}
                          placeholderTextColor={colors.blueBorder}
                          value={values.crunchbase}
                          onChangeText={props.handleChange("crunchbase")}
                        />
                      </Item>
                    </Validation>
                  </View>

                  <View style={styles.urlInputContainer}>
                    <Validation name="angelList" showMessage={true}>
                      <Item rounded style={{
                        ...baseStylesheet.inputItem,
                        marginTop: 5,
                        marginBottom: 5,
                        paddingLeft: 20,
                      }}
                      >
                        <AngelList />
                        <Input
                          style={baseStylesheet.inputField}
                          placeholder={t("investorEditScreen.angelListPlaceholder")}
                          placeholderTextColor={colors.blueBorder}
                          value={values.angelList}
                          onChangeText={props.handleChange("angelList")}
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
              )
            }}
          </Formik>
        </Content>
      </Container>
    )
  }
};

const mapStateToProps = (state, props) => {
  const userData = state.user.userData;
  const profileData = state.entrepreneurProfile.profileData;
  return {
    userData,
    profileData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: (values) => dispatch(save(values)),
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
    width: "100%"
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
})

const ValidationInputWrapper = ({
  title,
  length,
  maxLength,
  children,
}) => {
  return (
    <View
      style={styles.inputContainer}>
      <View style={styles.row}>
        <Label style={baseStylesheet.label}>
          {title}
        </Label>
        {
          length != undefined && (
            <Text style={styles.counter}>
              {length}/{maxLength}
            </Text>
          )
        }
      </View>
      {children}
    </View>
  )
};