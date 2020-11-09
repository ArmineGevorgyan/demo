import { Container, Content, Icon, Input, Item } from "native-base";
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
  handleNext = () => {
    const { save } = this.props;
    save();
  };

  handleReset = () => { }

  backButtonHandler = () => {
    this.props.navigation.goBack();
  };

  onSubmit = (values) => {

  };

  setResult = (item, type) => {
    if (type === "location") {
      this.props.setLocation(item);
    } else {
      this.props.setResidency(item);
    }
    this.props.updateProfile();
  };

  setTextInput = (data) => {
    this.props.setTextInput(data);
    this.props.updateProfile();
  }

  locationToString = () => {
    return `${this.props.location?.country?.name},${this.props.location?.name},${this.props.location?.region?.name}`;
  };

  timeZoneToString = () => {
    const { profileData } = this.props;
    return profileData.timeZone
      ? `${profileData.timeZone?.code}-${profileData.timeZone?.name}, ${profileData.timeZone?.offset}`
      : "";
  };

  residencyToString = () => {
    return `${this.props.residency?.country?.name},${this.props.residency?.name},${this.props.residency?.region?.name}`;
  };

  render() {
    const { t, profileData } = this.props;

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
          <Formik
            initialValues={{
              bio: profileData.bio || "",
              locations: "1",
              timeZone: "1",
              availableVia: profileData.availableVia || "",
              residency: "1",
              highlights: profileData.highlights || "",
            }}
            onSubmit={this.onSubmit}
            // validationSchema={schema}
          >
            {(props) => {
              const values = props.values;
              let bioLength = values.bio?.length || profileData.bio?.length;
              let highlightsLength = values.highlights?.length || profileData.highlights?.length;
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
                        value={values.bio || this.props.bio || ""}
                        onChangeText={props.handleChange("bio")}
                      />
                    </Validation>
                  </View>

                  {/* <Validation name="location" showMessage={true}> */}
                    <CityInput
                      title="Location"
                      inputType="location"
                      flagCode={profileData.locations ? profileData.locations[0]?.country?.isoCode : "US"}
                      value={profileData.locations.length !== 0 ? `${profileData.locations[0]?.country?.name}, ${profileData?.locations[0]?.city?.name}, ${profileData?.locations[0]?.region?.name}` : " v"}
                      setResult={this.setResult}
                    />
                  {/* </Validation> */}

                  <TimeZoneInput
                    value={this.timeZoneToString()}
                    setResult={(data) => this.setTextInput({ timeZone: data, })}
                  />

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
                          value={values.availableVia || profileData.availableVia || ""}
                          onChangeText={props.handleChange("availableVia")}
                        />
                      </Item>
                    </Validation>
                  </View>

                  <CityInput
                    title="Residency"
                    inputType="residency"
                    flagCode={profileData.residency?.country?.isoCode}
                    value={`${profileData.residency?.country?.name}, ${profileData?.residency?.city?.name}, ${profileData?.residency?.region?.name}`}
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
                        value={values.highlights || profileData.highlights}
                        onBlur={() => {
                          this.setTextInput({ highlights: values.highlights });
                        }}
                        onChangeText={props.handleChange("highlights")}
                      />
                    </Validation>
                  </View>

                  <View style={baseStylesheet.paddedContent}>
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
                      onPress={() => this.handleReset()}
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

        </Content>
      </Container >
    )
  };
};

const mapStateToProps = (state, props) => {
  const isModalOpen = state.dropdownInputModal.isModalOpen;
  const profileData = state.entrepreneurProfile.profileData;

  return {
    isModalOpen,
    profileData,
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