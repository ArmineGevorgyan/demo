import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { Content, Icon } from "native-base";
import { connect } from "react-redux";
import { compose } from "redux";
import { colors } from "../../../styles/colors";
import { withTranslation } from "react-i18next";
import DividerLine from "../../../components/dividerLine";
import { baseStylesheet } from "../../../styles/baseStylesheet";
import {
  linkedin,
  angellist,
  crunchbase,
} from "../../../components/socialLinks";
import StartupTextBlock from "../../../components/startupTextBlock";

const EntrepreneurTeamScreen = ({ t, startup, navigation, profile }) => {
  const aboutTeam = startup?.aboutTeam,
    id = startup?.id;

  const entrepreneurFields = [
    {
      titleText: "aboutTeam",
      content: aboutTeam,
    },
  ];

  const addCoFounder = () => {};

  return (
    <Content
      style={{
        ...baseStylesheet.baseContainer,
        ...baseStylesheet.containerSpacing,
      }}
    >
      <FlatList
        data={entrepreneurFields}
        renderItem={({ item: { titleText, content }, index }) => (
          <StartupTextBlock
            navigate={navigation.navigate}
            navigateTo="EditScreen"
            fieldName={titleText}
            titleText={`teamScreen.${titleText}`}
            content={content}
            id={id}
            isLast={index === entrepreneurFields.length - 1}
          />
        )}
      />

      <DividerLine style={{ marginVertical: 20 }} />

      <View>
        <Text style={{ ...baseStylesheet.titleText, marginBottom: 0 }}>
          {t("teamScreen.founders")}
        </Text>
        {/* Here must be some constant text */}
        <Text>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <Image style={styles.profileImage} source={profile.photoUrl} />

        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              ...styles.profileText,
              fontFamily: "montserrat-bold",
            }}
          >
            {`${profile.firstName} ${profile.lastName}`}
          </Text>
          <Text style={styles.profileText}>{t("teamScreen.ceo")}</Text>
          <Text>{profile.bio}</Text>
          <View style={styles.social}>
            {linkedin(profile.linkedinProfil, true)}
            {crunchbase(profile.crunchbaseProfile, true)}
            {angellist(profile.angelListProfile, true)}
          </View>
        </View>
      </View>

      <DividerLine />

      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor="#DDD"
        style={styles.addProductContainer}
        onPress={addCoFounder}
      >
        <>
          <Icon name="plus" type="SimpleLineIcons" style={styles.plusIcon} />
          <Text style={styles.addProductText}>
            {t("productScreen.addMoreProducts")}
          </Text>
        </>
      </TouchableHighlight>
    </Content>
  );
};

const mapStateToProps = (state, props) => {
  const profile = state.entrepreneurProfile.profileData;
  return { profile };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(EntrepreneurTeamScreen);

const styles = StyleSheet.create({
  mainText: {
    marginBottom: 10,
    color: colors.darkText,
  },
  profileImage: {
    width: 67,
    height: 67,
    borderRadius: 50,
  },
  profileText: {
    fontSize: 12,
  },
  addProductContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  addProductText: {
    color: colors.darkText,
    fontSize: 16,
    fontFamily: "montserrat-regular",
  },
  plusIcon: {
    color: colors.deepGreen,
    marginRight: 15,
  },
  social: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
});
