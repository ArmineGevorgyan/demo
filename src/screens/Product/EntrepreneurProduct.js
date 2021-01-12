import React from "react";
import { compose } from "redux";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Icon, Content } from "native-base";
import { withTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";

import DividerLine from "../../components/dividerLine";
import CollapsibleText from "../../components/collapsibleText";
import { baseStylesheet } from "../../styles/baseStylesheet";
import { colors } from "../../styles/colors";
import AddVideoIcon from "../../../assets/video-add.svg";

const EntrepreneurBlock = ({ t, titleText, id, content, navigate, isLast }) => (
  <>
    <TouchableOpacity
      onPress={() =>
        navigate("EditScreen", {
          title: t(`productScreen.${titleText}`),
          editingField: titleText,
          id,
        })
      }
    >
      <Text style={{ ...baseStylesheet.titleText, marginBottom: 10 }}>
        {t(`productScreen.${titleText}`)}
      </Text>
    </TouchableOpacity>
    <CollapsibleText
      text={content}
      textStyle={{ ...styles.mainText, color: colors.darkText }}
    />
    {!isLast && <DividerLine style={{ marginVertical: 10 }} />}
  </>
);

const EntrepreneurProduct = ({ startup, t, navigation }) => {
  const description = startup?.description,
    customers = startup?.customers,
    pricing = startup?.pricing,
    similarProducts = startup?.similarProducts,
    demoVideoUrl = startup?.demoVideoUrl,
    id = startup?.id;

  const entrepreneurFields = [
    {
      titleText: "description",
      content: description,
    },
    {
      titleText: "customers",
      content: customers,
    },
    {
      titleText: "pricing",
      content: pricing,
    },
    {
      titleText: "similarProducts",
      content: similarProducts,
    },
  ];

  return (
    <Content
      style={{
        ...baseStylesheet.baseContainer,
        ...baseStylesheet.containerSpacing,
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <Text style={{ ...baseStylesheet.titleText, marginBottom: 10 }}>
          {t("productScreen.demo")}
        </Text>
        <View style={styles.videoIconTextContainer}>
          <View style={styles.videoIconContainer}>
            <AddVideoIcon />
          </View>
          <Text style={styles.introVideoText}>
            {demoVideoUrl ? t("startupHeader.alreadyUploaded") : t("productScreen.addVideoFile")}
          </Text>
        </View>
      </View>
      <FlatList
        data={entrepreneurFields}
        renderItem={({ item, index }) => (
          <EntrepreneurBlock
            navigate={navigation.navigate}
            titleText={item.titleText}
            content={item.content}
            t={t}
            id={id}
            isLast={index === entrepreneurFields.length-1}
          />
        )}
      />
    </Content>
  );
};

export default compose(withTranslation("translations"))(EntrepreneurProduct);

const styles = StyleSheet.create({
  mainText: {
    marginBottom: 10,
    color: colors.darkText,
  },
  plusIcon: {
    color: colors.deepGreen,
    marginRight: 15,
  },
  addProductText: {
    color: colors.darkText,
    fontSize: 16,
    fontFamily: "montserrat-regular",
  },
  addProductContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  videoIconTextContainer: {
    height: 170,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  videoIconContainer: {
    width: 46,
    height: 46,
    backgroundColor: "#FFFFFF",
    opacity: 0.71,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    width: "90%",
    height: 260,
    top: 30,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  introVideoText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "montserrat-regular",
  },
});
