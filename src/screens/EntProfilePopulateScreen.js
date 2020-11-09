import { Container, Content, Icon, Item } from "native-base";
import React, { Component } from "react";
import ProfileBlueHeader from "../components/profileBlueHeader";
import { Button } from "native-base";
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
    this.props.updateProfile(item);
  };

  locationToString = () => {
    return `${this.props.location?.country?.name},${this.props.location?.name},${this.props.location?.region?.name}`;
  };

  timeZoneToString = () => {
    return this.props.timeZone
      ? `${this.props.timeZone?.code}-${this.props.timeZone?.name}, ${this.props.timeZone?.offset}`
      : "";
  };

  residencyToString = () => {
    return `${this.props.residency?.country?.name},${this.props.residency?.name},${this.props.residency?.region?.name}`;
  };

  render() {
    const { t, } = this.props;

    return (
      <Container style={{ backgroundColor: colors.offWhite, }}>
        <ProfileBlueHeader
          title="My Account"
        >
          <SelectImage />
        </ProfileBlueHeader>
        <Content style={{
          backgroundColor: colors.offWhite,
        }}>
          <Formik
            initialValues={{
              location: "",
            }}
            onSubmit={this.onSubmit}
            validationSchema={schema}
          >
            {(props) => {
              const values = props.values;
              return (
                <View style={styles.formContainer}>
                  <Validation name="location" showMessage={true}>
                    <CityInput
                      title="Location"
                      inputType="location"
                      flagCode={this.props.location?.country?.isoCode}
                      value={this.props.location ? this.locationToString() : ""}
                      setResult={this.setResult}
                    />

                    <TimeZoneInput
                      value={this.timeZoneToString()}
                      setResult={this.props.setTimeZone}
                    />

                    <CityInput
                      title="Residency"
                      inputType="residency"
                      flagCode={this.props.residency?.country?.isoCode}
                      value={this.props.residency ? this.residencyToString() : ""}
                      setResult={this.setResult}
                    />

                  </Validation>
                </View>
              );
            }}
          </Formik>
          <View style={baseStylesheet.paddedContent}>
            <Button
              onPress={() => this.onSubmit()}
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
        </Content>
      </Container >
    )
  };
};

const mapStateToProps = (state, props) => {
  const isModalOpen = state.dropdownInputModal.isModalOpen;
  const location = state.entrepreneurProfile.location;
  const timeZone = state.entrepreneurProfile.timeZone;
  const residency = state.entrepreneurProfile.residency;
  return {
    isModalOpen,
    location,
    timeZone,
    residency,
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
    updateProfile: (data) => (dispatch(updateProfile(data))),
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
});