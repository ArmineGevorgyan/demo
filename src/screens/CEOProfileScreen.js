import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { Content, Spinner } from "native-base";
import Flag from "react-native-flags";
import moment from "moment-timezone";
import ProfileHeader from "../components/profileHeader";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import { getProfileData } from "../redux/ducks/entrepreneurProfile";
import { linkedin, angellist, crunchbase } from "../components/socialLinks";
import ContentField from "../components/contentField";

class CEOProfileScreen extends Component {
  componentDidMount() {
    const { investorId } = this.props.route.params;

    this.props.getProfileData(investorId);
  }

  render() {
    const { t, isLoading, profile } = this.props;
    const { startup } = this.props.route.params;

    if (!profile || isLoading) {
      return <Spinner color={colors.secondaryColor} />;
    }

    const investorTime = moment()
      .tz("UTC")
      .add(profile.timeZone?.offset, "hours");

    return (
      <Content style={baseStylesheet.baseContainer}>
        <ProfileHeader
          title={`${profile.firstName} ${profile.lastName}`}
          subtitle={`${t("ceoProfileScreen.ceoAt")} ${startup.name}`}
          backButtonHandler={() => this.props.navigation.goBack()}
          photoUrl={profile.photoUrl}
        />
        <View style={styles.investorInfo}>
          <View style={styles.social}>
            {linkedin(profile.linkedinProfile)}
            {!!profile.crunchbaseProfile &&
              crunchbase(profile.crunchbaseProfile)}
            {!!profile.angelListProfile && angellist(profile.angelListProfile)}
          </View>

          <ContentField
            title={t("ceoProfileScreen.bio")}
            content={profile.bio}
            bottomBorder={true}
          />
          <ContentField
            title={t("ceoProfileScreen.locations")}
            bottomBorder={true}
          >
            <View style={styles.row}>
              <Flag
                code={profile.locations[0]?.country?.isoCode}
                size={32}
                style={styles.flag}
              />
              <Text style={styles.text}>
                {`${profile?.locations[0]?.city?.name}, ${profile.locations[0]?.country?.name}`}
              </Text>
            </View>
          </ContentField>
          <ContentField
            title={t("ceoProfileScreen.timezone")}
            bottomBorder={true}
          >
            <View style={styles.row}>
              <View style={styles.margin}>
                <View style={styles.row}>
                  <Flag
                    code={profile?.locations[0]?.country?.isoCode}
                    size={32}
                    style={styles.flag}
                  />
                  <Text
                    style={[styles.text, styles.timezone]}
                  >{`${profile.timeZone?.name}`}</Text>
                </View>
                <View style={styles.row}>
                  <View style={{ width: 55 }} />
                  <Text style={[styles.text, styles.flagOffset]}>
                    {`${profile.timeZone?.code} (${t("ceoProfileScreen.utc")} ${
                      profile.timeZone?.offset
                    })`}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.boldText}>{investorTime.format("LT")}</Text>
                <Text style={styles.boldText}>{`${investorTime.format(
                  "ddd"
                )}, ${investorTime.format("ll")}`}</Text>
              </View>
            </View>
          </ContentField>
          {profile.residency && (
            <ContentField
              title={t("ceoProfileScreen.residency")}
              bottomBorder={true}
            >
              <View style={styles.row}>
                <Flag
                  code={profile.residency.country?.isoCode}
                  size={32}
                  style={styles.flag}
                />
                <Text style={styles.text}>
                  {`${profile.residency.city?.name}, ${profile.residency.country?.name}`}
                </Text>
              </View>
            </ContentField>
          )}
          <ContentField
            title={t("ceoProfileScreen.highlights")}
            content={profile.bio}
          />
        </View>
      </Content>
    );
  }
}

const mapStateToProps = (state, props) => {
  const profile = state.entrepreneurProfile.profileData;
  const isLoading = state.entrepreneurProfile.isLoading;

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
)(CEOProfileScreen);

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
    alignItems: "center",
  },
  flag: {
    marginLeft: 10,
    marginRight: 15,
    marginBottom: -5,
  },
  text: {
    color: colors.blueText,
    fontSize: 14,
    fontFamily: "montserrat-regular",
    alignSelf: "center",
    width: "75%",
  },
  boldText: {
    color: colors.blueText,
    fontSize: 14,
    fontFamily: "montserrat-semi-bold",
    alignSelf: "center",
    width: "80%",
    lineHeight: 25,
    marginRight: 20,
  },
  flagOffset: {
    lineHeight: 25,
  },
  margin: {
    marginRight: 15,
    width: "60%",
  },
  row: {
    flexDirection: "row",
  },
});
