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
  setLocation,
  setTimeZone,
  setResidency,
  updateProfile,
  resetProfile,
  setTextInput,
} from "../redux/ducks/entrepreneurProfile";
import {
  openModal,
  closeModal,
} from "../redux/ducks/dropdownInputModal";
import schema from "../validation/entProfileSchema";
import { Formik } from "formik";
import Validation from "../validation";
import CityInput from "../components/cityInput";
import TimeZoneInput from "../components/timeZoneInput";
import constants from "../constants";

class EntProfilePopulateScreen extends Component {
  constructor(props) {
    super(props);
    this.formik = React.createRef();
  }

  handleNext = () => {
    const { save } = this.props;
    save();
  };

  handleReset = () => {
    this.props.resetProfile();
    this.formik.resetForm({
      "bio": "",
      "locations": "",
      "timeZone": "",
      "availableVia": "",
      "residency": "",
      "highlights": "",
    });
  };

  backButtonHandler = () => {
    this.props.navigation.goBack();
  };

  onSubmit = (values) => {
    this.props.setTextInput({ completed: true });
    this.props.updateProfile();
  };

  setResult = (item, type) => {
    if (type === "location") {
      this.props.setLocation(item);
      this.formik.setValues({
        ...this.formik.values,
        "locations": `${item.country?.name},${item.name},${item.region?.name}`,
      });
    } else {
      this.formik.setValues({
        ...this.formik.values,
        "residency": `${item.country?.name},${item.name},${item.region?.name}`,
      });
      this.props.setResidency(item);
    }
    this.props.updateProfile();
  };

  setTextInput = (data) => {
    this.props.setTextInput(data);
    this.props.updateProfile();
  }

  locationToString = () => {
    const { profileData } = this.props;
    return (profileData.locations && profileData.locations.length > 0)
      ? `${profileData.locations[0]?.country?.name},${profileData.locations[0]?.city?.name},${profileData.locations[0]?.region?.name}`
      : "";
  };

  timeZoneToString = () => {
    const { profileData } = this.props;
    return profileData.timeZone
      ? `${profileData.timeZone?.code}-${profileData.timeZone?.name}, ${profileData.timeZone?.offset}`
      : "";
  };

  residencyToString = () => {
    const { profileData } = this.props;
    return profileData.residency ?
      `${profileData.residency?.country?.name},${profileData.residency?.city?.name},${profileData.residency?.region?.name}`
      : "";
  };

  getLocationFlag = () => {
    const { profileData } = this.props;
    return (profileData.locations && profileData.locations.length > 0)
      ? profileData?.locations[0]?.country?.isoCode
      : "";
  }

  render() {
    const { t,
      profileData,
      isLoading,
    } = this.props;

    return (
      <Container style={{ backgroundColor: colors.offWhite, }}>
        <ProfileBlueHeader
          title="My Account"
        >
          <SelectImage
            photoUrl={this.props.profileData.photoUrl}
            setImage={
              (image) => this.setTextInput({ photoUrl: image })
            }
          />
        </ProfileBlueHeader>
        <Content style={{
          backgroundColor: colors.offWhite,
        }}>
          {
            profileData.id ?
              <Formik
                innerRef={(p) => (this.formik = p)}
                initialValues={{
                  bio: profileData.bio || "",
                  locations: this.locationToString(),
                  timeZone: this.timeZoneToString(),
                  availableVia: profileData.availableVia || "",
                  residency: this.residencyToString(),
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
                            onBlur={() => {
                              this.setTextInput({ bio: props.values.bio });
                            }}
                            maxLength={constants.shortBioMaxLength}
                            placeholder={t("entProfilePopulateScreen.bioPlaceholder")}
                            placeholderTextColor={colors.blueBorder}
                            style={baseStylesheet.textarea}
                            value={values.bio}
                            onChangeText={props.handleChange("bio")}
                          />
                        </Validation>
                      </View>

                      <Validation name="locations" showMessage={true}>
                        <CityInput
                          title="Location"
                          inputType="location"
                          flagCode={this.getLocationFlag()}
                          value={values.locations}
                          setResult={this.setResult}
                        />
                      </Validation>

                      <Validation name="timeZone" showMessage={true}>
                        <TimeZoneInput
                          value={values.timeZone || this.timeZoneToString()}
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
                              onBlur={() => {
                                this.setTextInput({ availableVia: props.values.availableVia });
                              }}
                              style={baseStylesheet.inputField}
                              placeholder={t("entProfilePopulateScreen.availableViaPlaceholder")}
                              placeholderTextColor={colors.blueBorder}
                              value={values.availableVia}
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
                            {t("entProfilePopulateScreen.nextButton")}
                          </Text>
                          <Icon
                            name="arrow-right"
                            type="Feather"
                            style={styles.rightIcon}
                          />
                        </Button>

                        <Button
                          style={baseStylesheet.grayButton}
                          onPress={this.handleReset}
                        >
                          <Text style={baseStylesheet.grayButtonText}>
                            {t("entProfilePopulateScreen.resetButton")}
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
  return {
    isModalOpen,
    profileData,
    isResetting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: () => dispatch(save()),
    openModal: (title) => dispatch(openModal(title)),
    closeModal: () => dispatch(closeModal()),
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
)(EntProfilePopulateScreen);

const styles = StyleSheet.create({
  formContainer: {
    paddingLeft: "5%",
    paddingRight: "5%",
    alignItems: "center",
    width: "100%",
    marginBottom: 50,
  },
  rightIcon: {
    position: "absolute",
    left: "60%",
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
});