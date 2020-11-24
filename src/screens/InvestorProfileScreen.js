import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { Button, Content, Spinner } from "native-base";
import * as WebBrowser from "expo-web-browser";
import ProfileHeader from "../components/profileHeader";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import Linkedin from "../../assets/linkedin.svg";
import Angellist from "../../assets/angellist.svg";
import Crunchbase from "../../assets/crunchbase.svg";
import { getProfileData } from "../redux/ducks/investorProfile";

class InvestorProfileScreen extends Component {
  componentDidMount() {
    const { investorId } = this.props.route.params;
    this.props.getProfileData(investorId);
  }

  openBrowser = async (profileUrl) => {
    await WebBrowser.openBrowserAsync(profileUrl);
  };

  render() {
    const { t, isLoading, profile } = this.props;

    if (!profile || isLoading) {
      return <Spinner color={colors.secondaryColor} />;
    }

    return (
      <Content style={baseStylesheet.baseContainer}>
        <ProfileHeader
          title={`${profile.firstName} ${profile.lastName}`}
          backButtonHandler={() => this.props.navigation.goBack()}
          photoUrl={profile.photoUrl}
        />
        <View style={styles.investorInfo}>
          {!!profile.companyName && (
            <Text style={styles.company}>{profile.companyName}</Text>
          )}
          {!!profile.position && (
            <Text style={styles.position}>{profile.position}</Text>
          )}
          {!!profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}
          <TouchableOpacity
            style={styles.social}
            onPress={() => this.openBrowser(profile.linkedinProfile)}
          >
            <Linkedin />
            <Text style={styles.link}>
              {t("investorProfileScreen.linkedinProfile")}
            </Text>
          </TouchableOpacity>
          {!!profile.crunchbaseProfile && (
            <TouchableOpacity
              style={styles.social}
              onPress={() => this.openBrowser(profile.crunchbaseProfile)}
            >
              <Crunchbase />
              <Text style={styles.link}>
                {t("investorProfileScreen.crunchbaseProfile")}
              </Text>
            </TouchableOpacity>
          )}
          {!!profile.angelListProfile && (
            <TouchableOpacity
              style={styles.social}
              onPress={() => this.openBrowser(profile.angelListProfile)}
            >
              <Angellist />
              <Text style={styles.link}>
                {t("investorProfileScreen.angelListProfile")}
              </Text>
            </TouchableOpacity>
          )}
          <Button style={baseStylesheet.secondaryButton}>
            <Text style={baseStylesheet.secondaryButtonText}>
              {t("investorProfileScreen.sendMessage")}
            </Text>
          </Button>
        </View>
      </Content>
    );
  }
}

const mapStateToProps = (state, props) => {
  const profile = state.investorProfile.profileData;
  const isLoading = state.investorProfile.isLoading;

  return {
    isLoading,
    profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileData: (investorId) => dispatch(getProfileData(investorId)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(InvestorProfileScreen);

const styles = StyleSheet.create({
  investorInfo: {
    marginBottom: 30,
    width: "85%",
    alignSelf: "center",
  },
  company: {
    color: colors.blueText,
    fontSize: 18,
    fontFamily: "montserrat-light",
    textAlign: "center",
  },
  position: {
    color: colors.blueText,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "montserrat-medium",
  },
  bio: {
    color: colors.blueText,
    fontSize: 14,
    fontFamily: "montserrat-regular",
    marginBottom: 20,
    marginTop: 12,
    borderBottomColor: colors.blueBorder,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  social: {
    flexDirection: "row",
    marginBottom: 12,
  },
  link: {
    color: colors.lightBlue,
    marginLeft: 10,
    alignSelf: "center",
  },
});
