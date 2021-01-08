import React from "react";
import { compose } from "redux";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Icon, Content } from "native-base";
import { withTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";

import DividerLine from "../../components/dividerLine";
import VideoView from "../../components/videoView";
import CollapsibleText from "../../components/collapsibleText";
import { baseStylesheet } from "../../styles/baseStylesheet";
import { colors } from "../../styles/colors";
import constants from "../../constants";

const EntrepreneurBlock = ({ t, titleText, content, navigate }) => (
  <>
    <TouchableOpacity onPress={() => navigate("EditScreen", { titleText })}>
      <Text style={{ ...baseStylesheet.titleText, marginBottom: 10 }}>
        {t(`productScreen.${titleText}`)}
      </Text>
      <CollapsibleText
        text={content}
        textStyle={{ ...styles.mainText, color: colors.darkText }}
      />
    </TouchableOpacity>
    <DividerLine style={{ marginVertical: 10 }} />
  </>
);

const EntrepreneurProduct = ({
  startup,
  t,
  navigation,
}) => {
  const description = startup?.description,
  customers = startup?.customers,
  pricing = startup?.pricing,
  similarProducts = startup?.similarProducts;

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
      titleText: "similarProd",
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
      </View>
      {/* Video here, separate from the rest */}
      <FlatList
        data={entrepreneurFields}
        renderItem={({ item }) => (
          <EntrepreneurBlock
            navigate={navigation.navigate}
            titleText={item.titleText}
            content={item.content}
            t={t}
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
    alignItems: "center"
  },
});
