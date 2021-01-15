import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { colors } from "../../../styles/colors";
import { withTranslation } from "react-i18next";
import DividerLine from "../../../components/dividerLine";
import { baseStylesheet } from "../../../styles/baseStylesheet";
import CollapsibleText from "../../../components/collapsibleText";
import { Content, Icon } from "native-base";
import { Image } from "react-native";

const EntrepreneurBlock = ({ t, titleText, id, content, navigate, isLast }) => (
  <>
    <TouchableOpacity
      onPress={() =>
        navigate("EditScreen", {
          title: t(`teamScreen.${titleText}`),
          editingField: titleText,
          id,
        })
      }
    >
      <Text style={{ ...baseStylesheet.titleText, marginBottom: 10 }}>
        {t(`teamScreen.${titleText}`)}
      </Text>
    </TouchableOpacity>
    <CollapsibleText
      text={content}
      textStyle={{ ...styles.mainText, color: colors.darkText }}
    />
    {!isLast && <DividerLine style={{ marginVertical: 10 }} />}
  </>
);

const EntrepreneurTeamScreen = ({ t, startup, navigation, profile }) => {
  const aboutTeam = startup?.aboutTeam,
    founders = startup?.founders,
    id = startup?.id;

  const entrepreneurFields = [
    {
      titleText: "aboutTeam",
      content: aboutTeam,
    },
    {
      titleText: "founders",
      content: founders,
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
        renderItem={({ item, index }) => (
          <EntrepreneurBlock
            navigate={navigation.navigate}
            titleText={item.titleText}
            content={item.content}
            t={t}
            id={id}
            isLast={index === entrepreneurFields.length - 1}
          />
        )}
      />

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Image
          style={{
            width: 67,
            height: 67,
            borderRadius: 50,
            backgroundColor: "#000",
          }}
          source={profile.photoUrl}
        />

        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              ...styles.profileText,
              fontFamily: "montserrat-bold",
            }}
          >
            {`${profile.firstName} ${profile.lastName}`}
          </Text>
          <Text style={styles.profileText}>CEO</Text>
          <Text>{profile.bio}</Text>
        </View>
      </View>

      <DividerLine style={{ marginVertical: 20 }} />

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
});
