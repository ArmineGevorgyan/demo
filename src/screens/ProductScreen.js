import React, { Component } from "react";
import { compose } from "redux";
import { StyleSheet, Text, View } from "react-native";
import { Content } from "native-base";
import { withTranslation } from "react-i18next";

import DividerLine from '../components/dividerLine';
import VideoView from '../components/videoView';
import CollapsibleText from '../components/collapsibleText';
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import constants from "../constants";

class ProductScreen extends Component {

  render() {
    const {
      t,
      navigation,
      startup: { demoVideoUrl, description, customers, pricing, similarProducts },
    } = this.props;

    const videoWidth = constants.windowWidth - 60; // 60 = cardHorizontalMargin
    const videoHeight = videoWidth / constants.widescreenVideoRatio;

    return (
      <Content style={{ ...baseStylesheet.baseContainer, ...baseStylesheet.containerSpacing }}>
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
        <Text style={{...baseStylesheet.titleText, marginBottom: 10 }}>
          {t("productScreen.description")}
        </Text>
        <CollapsibleText text={description} numberOfLines={4} textStyle={{ ...styles.mainText, color: colors.darkText }} />
        {/* A reusable textBlock component is not added, because there was no example of backend data, thus no info fields' differences */}
        <DividerLine style={{ marginVertical: 10 }} />
        <Text style={{...baseStylesheet.titleText, marginBottom: 10 }}>
          {t("productScreen.customers")}
        </Text>
        <Text style={styles.mainText}>
          {customers}
        </Text>
        <DividerLine style={{ marginVertical: 10 }} />
        <Text style={{...baseStylesheet.titleText, marginBottom: 10 }}>
          {t("productScreen.pricing")}
        </Text>
        <Text style={styles.mainText}>
          {pricing}
        </Text>
        <DividerLine style={{ marginVertical: 10 }} />
        <Text style={{...baseStylesheet.titleText, marginBottom: 10 }}>
          {t("productScreen.similarProducts")}
        </Text>
        <Text style={styles.mainText}>
          {similarProducts}
        </Text>
      </Content>
    );
  }
}

export default compose(
  withTranslation("translations")
)(ProductScreen);

const styles = StyleSheet.create({
  mainText: {
    marginBottom: 10,
    color: colors.darkText
  }
});