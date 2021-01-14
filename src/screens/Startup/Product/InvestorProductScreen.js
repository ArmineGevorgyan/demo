import React, { Component } from "react";
import { compose } from "redux";
import { StyleSheet, Text, View } from "react-native";
import { Content } from "native-base";
import { withTranslation } from "react-i18next";

import DividerLine from "../../../components/dividerLine";
import VideoView from "../../../components/videoView";
import CollapsibleText from "../../../components/collapsibleText";
import { baseStylesheet } from "../../../styles/baseStylesheet";
import { colors } from "../../../styles/colors";
import constants from "../../../constants";

class InvestorProductScreen extends Component {
  render() {
    const {
      t,
      navigation,
      startup: {
        demoVideoUrl,
        description,
        customers,
        pricing,
        similarProducts,
      },
    } = this.props;

    const videoWidth = constants.windowWidth - 60; // 60 = cardHorizontalMargin
    const videoHeight = videoWidth / constants.widescreenVideoRatio;

    return (
      <Content
        style={{
          ...baseStylesheet.baseContainer,
          ...baseStylesheet.containerSpacing,
        }}
      >
        <>
          {demoVideoUrl && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ ...baseStylesheet.titleText, marginBottom: 10 }}>
                {t("productScreen.demo")}
              </Text>
              <VideoView
                videoSource={demoVideoUrl}
                navigation={navigation}
                size={{
                  width: videoWidth,
                  height: videoHeight,
                }}
              />
            </View>
          )}
          {description && (
            <>
              <Text style={{ ...baseStylesheet.titleText, marginBottom: 10 }}>
                {t("productScreen.description")}
              </Text>
              <CollapsibleText
                text={description}
                numberOfLines={6}
                textStyle={{ ...styles.mainText, color: colors.darkText }}
              />
              <DividerLine style={{ marginVertical: 10 }} />
            </>
          )}
          {/* A reusable textBlock component is not added, because there was no example of backend data, thus no info fields' differences */}
          {customers && (
            <>
              <Text style={{ ...baseStylesheet.titleText, marginBottom: 10 }}>
                {t("productScreen.customers")}
              </Text>
              <CollapsibleText
                text={customers}
                numberOfLines={6}
                textStyle={{ ...styles.mainText, color: colors.darkText }}
              />
              <DividerLine style={{ marginVertical: 10 }} />
            </>
          )}
          {pricing && (
            <>
              <Text style={{ ...baseStylesheet.titleText, marginBottom: 10 }}>
                {t("productScreen.pricing")}
              </Text>
              <CollapsibleText
                text={pricing}
                numberOfLines={6}
                textStyle={{ ...styles.mainText, color: colors.darkText }}
              />
              <DividerLine style={{ marginVertical: 10 }} />
            </>
          )}
          {similarProducts && (
            <>
              <Text style={{ ...baseStylesheet.titleText, marginBottom: 10 }}>
                {t("productScreen.similarProducts")}
              </Text>
              <CollapsibleText
                text={similarProducts}
                numberOfLines={6}
                textStyle={{ ...styles.mainText, color: colors.darkText }}
              />
            </>
          )}
        </>
      </Content>
    );
  }
}

export default compose(withTranslation("translations"))(InvestorProductScreen);

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
