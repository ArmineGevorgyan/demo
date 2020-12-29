import React, { Component } from "react";
import { compose } from "redux";
import { StyleSheet, Text, View, Icon, FlatList } from "react-native";
import { Content } from "native-base";
import { withTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";

import DividerLine from "../../components/dividerLine";
import VideoView from "../../components/videoView";
import CollapsibleText from "../../components/collapsibleText";
import { baseStylesheet } from "../../styles/baseStylesheet";
import { colors } from "../../styles/colors";
import constants from "../../constants";
import { render } from "react-dom";

const EntrepreneurBlock = ({ titleText, content, navigate }) => (
  <TouchableOpacity onPress={() => navigate("EditScreen", { titleText })}>
    <Text style={{ ...baseStylesheet.titleText, marginBottom: 10 }}>
      {titleText}
    </Text>
    <CollapsibleText
      text={content}
      textStyle={{ ...styles.mainText, color: colors.darkText }}
    />
    <DividerLine style={{ marginVertical: 10 }} />
  </TouchableOpacity>
);

const EntrepreneurProduct = ({ startup, t, navigation }) => {
  // startup: {
  // demoVideoUrl,
  //   description='placeholder',
  //   customers='placeholder',
  //   pricing='placeholder',
  //   similarProducts='placeholder',
  // },

  const entrepreneurFields = [
    {
      titleText: "description",
      content: t("productScreen.description"),
    },
    {
      titleText: "customers",
      content: t("productScreen.customers"),
    },
    {
      titleText: "pricing",
      content: t("productScreen.pricing"),
    },
    {
      titleText: "similarProd",
      content: t("productScreen.similarProducts"),
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
      </View>
      <FlatList
        data={entrepreneurFields}
        renderItem={({ item }) => (
          <EntrepreneurBlock
            navigate={navigation.navigate}
            titleText={item.titleText}
            content={item.content}
          />
        )}
      />
      <View style={styles.addProductContainer}>
        <Icon type="SimpleLineIcons" name="plus" style={styles.plusIcon} />
        <Text style={styles.addProductText}>
          {t("productScreen.addMoreProducts")}
        </Text>
      </View>
      <DividerLine style={{ marginVertical: 10 }} />
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
  },
});
