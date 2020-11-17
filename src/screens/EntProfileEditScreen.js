import { Container, Content, Icon, Input, Item, Spinner } from "native-base";
import React, { Component } from "react";
import ProfileBlueHeader from "../components/profileBlueHeader";
import { Button, Label, Textarea } from "native-base";
import { StyleSheet, Text, View, Keyboard } from "react-native";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { colors } from "../styles/colors";
import { baseStylesheet } from "../styles/baseStylesheet";
import SelectImage from "../components/selectImage";
import {
  save,
  getProfileData,
  setLocation,
  setTimeZone,
  setResidency,
  updateProfile,
  resetProfile,
  setTextInput,
  togglePhotoError,
} from "../redux/ducks/entrepreneurProfile";
import {
  openModal,
  closeModal,
} from "../redux/ducks/dropdownInputModal";
import schema from "../validation/entProfileEditSchema";
import { Formik } from "formik";
import Validation from "../validation";
import CityInput from "../components/cityInput";
import TimeZoneInput from "../components/timeZoneInput";
import constants from "../constants";
import {
  locationToString,
  timeZoneToString,
  residencyToString,
  getLocationFlag,
} from "../helpers/profileHelper";

class EntProfileEditScreen extends Component {
  constructor(props) {
    super(props);
    this.formik = React.createRef();
    this.inputRef1 = React.createRef();
    this.inputRef2 = React.createRef();
    this.inputRef3 = React.createRef();
    this.inputRef4 = React.createRef();
  }

  componentDidMount() {
    this.props.getProfileData();
    Keyboard.addListener("keyboardDidHide", this.unBlurInputs);
  };

  unBlurInputs = () => {
    this.inputRef?._root?.blur();
    this.inputRef2?._root?.blur();
    this.inputRef3?._root?.blur();
    this.inputRef4?._root?.blur();
  };

  handleNext = () => {
    const { togglePhotoError } = this.props;

    this.formik.handleSubmit();

    this.formik.validateForm()
      .then((value) => {
        if (Object.keys(value).length > 0 || !this.props.profileData.photoUrl) {
          togglePhotoError(true);
        } else {
          togglePhotoError(false);
        }
      })
  };

  handleCancel = () => {
    this.formik.resetForm();
    this.props.getProfileData();
    this.props.togglePhotoError(false);
  };

  backButtonHandler = () => {
    this.props.navigation.goBack();
  };

  onSubmit = (values) => {
    this.props.save(values.fullName);
      this.props.setTextInput({
        completed: true,
        bio: values.bio,
        availableVia: values.availableVia,
        highlights:values.highlights,
      });
      this.props.updateProfile();
  };

  setResult = (item, type) => {
    if (type === "location") {
      this.props.setLocation(item);
      this.formik.setValues({
        ...this.formik.values,
        "locations": typeof item === "string" ? item : `${item.country?.name},${item.name},${item.region?.name}`,
      });
    } else {
      this.formik.setValues({
        ...this.formik.values,
        "residency": typeof item === "string" ? item : `${item.country?.name},${item.name},${item.region?.name}`,
      });
      this.props.setResidency(item);
    }
  };

  setTextInput = (data) => {
    this.props.setTextInput(data);
  };

  render() {
    const { t,
      profileData,
      isLoading,
      userData,
    } = this.props;

    return (
      <Container style={{ backgroundColor: colors.offWhite, }}>
        <ProfileBlueHeader
          title="My Account"
          backButtonHandler={() => this.props.navigation.goBack()}
        >
          <SelectImage
            photoUrl={this.props.profileData.photoUrl}
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
          {
            profileData.id ?
              <Formik
                innerRef={(p) => (this.formik = p)}
                initialValues={{
                  fullName: `${userData.firstName} ${userData.lastName}`,
                  bio: profileData.bio || "",
                  locations: locationToString(profileData.locations),
                  timeZone: timeZoneToString(profileData.timeZone),
                  availableVia: profileData.availableVia || "",
                  residency: residencyToString(profileData.residency),
                  highlights: profileData.highlights || "",
                }}
                onSubmit={this.onSubmit}
                validationSchema={schema}
              >
                {(props) => {
                  const values = props.values;
                  let bioLength = values.bio?.length || 0;
                  let highlightsLength = values.highlights?.length || 0;
                  return (
                    <View style={styles.formContainer}>
                      <View style={styles.message}>
                        <View style={styles.row}>
                          <Label style={baseStylesheet.label}>
                            {t("entProfileEditScreen.fullName")}
                          </Label>
                        </View>
                        <Validation name="fullName" showMessage={true}>
                          <Item rounded style={baseStylesheet.inlineButtonInputItem}>
                            <Input
                              ref={input => { this.inputRef1 = input }}
                              style={baseStylesheet.inputField}
                              placeholder={t("entProfileEditScreen.fullNamePlaceholder")}
                              placeholderTextColor={colors.blueBorder}
                              value={values.fullName}
                              onChangeText={props.handleChange("fullName")}
                            />
                          </Item>
                        </Validation>
                      </View>

                      <View style={styles.message}>
                        <View style={styles.row}>
                          <Label style={baseStylesheet.label}>
                            {t("entProfilePopulateScreen.bio")}
                          </Label>
                          <Text style={styles.counter}>
                            {bioLength}/{constants.shortBioMaxLength}
                          </Text>
                        </View>
                        <Validation name="bio" showMessage={true}>
                          <Textarea
                            bordered
                            rowSpan={5}
                            ref={input => { this.inputRef2 = input }}
                            maxLength={constants.shortBioMaxLength}
                            placeholder={t("entProfilePopulateScreen.bioPlaceholder")}
                            placeholderTextColor={colors.blueBorder}
                            style={baseStylesheet.textarea}
                            value={values.bio}
                            onBlur={() => {
                              this.setTextInput({ bio: props.values.bio });
                            }}
                            onChangeText={props.handleChange("bio")}
                          />
                        </Validation>
                      </View>

                      <View style={styles.message}>
                        <Validation name="locations" showMessage={true}>
                          <CityInput
                            title="Location"
                            inputType="location"
                            flagCode={getLocationFlag(profileData.locations)}
                            value={values.locations}
                            setResult={this.setResult}
                          />
                        </Validation>
                      </View>

                      <Validation name="timeZone" showMessage={true}>
                        <TimeZoneInput
                          value={values.timeZone || timeZoneToString(profileData.timeZone)}
                          setResult={(data) => this.setTextInput({ timeZone: data, })}
                        />
                      </Validation>

                      <View style={styles.message}>
                        <View style={styles.row}>
                          <Label style={baseStylesheet.label}>
                            {t("entProfilePopulateScreen.availableVia")}
                          </Label>
                        </View>
                        <Validation name="availableVia" showMessage={true}>
                          <Item rounded style={baseStylesheet.inlineButtonInputItem}>
                            <Input
                              style={baseStylesheet.inputField}
                              ref={input => { this.inputRef3 = input }}
                              placeholder={t("entProfilePopulateScreen.availableViaPlaceholder")}
                              placeholderTextColor={colors.blueBorder}
                              value={values.availableVia}
                              onBlur={() => {
                                this.setTextInput({ availableVia: props.values.availableVia });
                              }}
                              onChangeText={props.handleChange("availableVia")}
                            />
                          </Item>
                        </Validation>
                      </View>

                      <CityInput
                        title="Residency"
                        inputType="residency"
                        flagCode={profileData.residency?.country?.isoCode || ""}
                        value={values.residency}
                        setResult={this.setResult}
                      />

                      <View style={styles.message}>
                        <View style={styles.row}>
                          <Label style={baseStylesheet.label}>
                            {t("entProfilePopulateScreen.highlights")}
                          </Label>
                          <Text style={styles.counter}>
                            {highlightsLength}/{constants.highlightsMaxLength}
                          </Text>
                        </View>
                        <Validation name="highlights" showMessage={true}>
                          <Textarea
                            bordered
                            rowSpan={5}
                            ref={input => { this.inputRef4 = input }}
                            maxLength={constants.shortBioMaxLength}
                            placeholder={t("entProfilePopulateScreen.highlightsPlaceholder")}
                            placeholderTextColor={colors.blueBorder}
                            style={baseStylesheet.textarea}
                            value={values.highlights}
                            onBlur={() => {
                              this.setTextInput({ highlights: values.highlights });
                            }}
                            onChangeText={props.handleChange("highlights")}
                          />
                        </Validation>
                      </View>

                      <View>
                        <Button
                          onPress={props.handleSubmit}
                          style={baseStylesheet.mainButton}
                        >
                          <Text style={baseStylesheet.mainButtonText}>
                            {t("entProfileEditScreen.saveButton")}
                          </Text>
                        </Button>

                        <Button
                          style={baseStylesheet.grayButton}
                          onPress={this.handleCancel}
                        >
                          <Text style={baseStylesheet.grayButtonText}>
                            {t("entProfileEditScreen.cancelButton")}
                          </Text>
                        </Button>
                      </View>
                    </View>
                  );
                }}
              </Formik>
              : <Spinner color={colors.secondaryColor} />
          }

        </Content>
      </Container >
    )
  };
};

const mapStateToProps = (state, props) => {
  const isLoading = state.entrepreneurProfile.isLoading;
  const isModalOpen = state.dropdownInputModal.isModalOpen;
  const profileData = state.entrepreneurProfile.profileData;
  const isResetting = state.entrepreneurProfile.isResetting;
  const photoError = state.entrepreneurProfile.photoError;
  const userData = state.user.userData;

  return {
    isModalOpen,
    profileData,
    isResetting,
    photoError,
    userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: (values) => dispatch(save(values)),
    openModal: (title) => dispatch(openModal(title)),
    closeModal: () => dispatch(closeModal()),
    getProfileData: () => dispatch(getProfileData()),
    togglePhotoError: (value) => dispatch(togglePhotoError(value)),
    setLocation: (location) => dispatch(setLocation(location)),
    setTimeZone: (timeZone) => dispatch(setTimeZone(timeZone)),
    setResidency: (residency) => dispatch(setResidency(residency)),
    updateProfile: () => dispatch(updateProfile()),
    resetProfile: () => dispatch(resetProfile()),
    setTextInput: (data) => dispatch(setTextInput(data)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(EntProfileEditScreen);

const styles = StyleSheet.create({
  formContainer: {
    paddingLeft: "5%",
    paddingRight: "5%",
    alignItems: "center",
    width: "100%",
    marginBottom: 50,
  },
  message: { marginBottom: 10, width: "100%" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  counter: {
    color: colors.darkText,
    fontSize: 10,
    fontFamily: "montserrat-regular",
  },
  errorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    marginLeft: 5,
    fontSize: 12,
  },
  alertIcon: {
    fontSize: 15,
    color: "red",
  },
});