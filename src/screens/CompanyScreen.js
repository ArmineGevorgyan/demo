import React, { Component } from "react";
import { compose } from "redux";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { Content } from "native-base";
import { withTranslation } from "react-i18next";
import * as WebBrowser from "expo-web-browser";
import moment from "moment";
import Flag from "react-native-flags";

import DividerLine from "../components/dividerLine";
import { baseStylesheet } from "../styles/baseStylesheet";
import TextBlock from "../components/textBlock";
import { colors } from "../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const openBrowser = async url => {
  await WebBrowser.openBrowserAsync(url);
};
class CompanyScreen extends Component {
  render() {
    const {
      t,
      startup: {
        founded,
        location: {
          country: { name: countryName, isoCode },
          city: { name: cityName },
        },
        progressToDate,
        vision,
        competition,
        businessModel,
        distribution,
        legal,
        pitchDeckUrl,
        links,
      },
    } = this.props;

    const parsedFounded = moment(founded?.slice(0, founded?.indexOf("T"))).format(
      "DD.MM.YYYY"
    );

    return (
      <Content
        style={{
          ...baseStylesheet.baseContainer,
          ...baseStylesheet.containerSpacing,
        }}
      >
        {founded && (
          <TextBlock title="companyScreen.founded" text={parsedFounded} />
        )}
        {countryName && cityName && (
          <TextBlock
            title="companyScreen.location"
            text={`${cityName}, ${countryName}`}
            renderTextPrefix={() => 
              <Flag
                code={isoCode}
                size={32}
                style={{ marginRight: 10 }}
              />
            }
          />
        )}
        {progressToDate && (
          <TextBlock
            title="companyScreen.progressToDate"
            text={progressToDate}
          />
        )}
        {vision && (
          <TextBlock title="companyScreen.longTermVision" text={vision} />
        )}
        {competition && (
          <TextBlock title="companyScreen.competition" text={competition} />
        )}
        {businessModel && (
          <TextBlock title="companyScreen.businessModel" text={businessModel} />
        )}
        {distribution && (
          <TextBlock title="companyScreen.distribution" text={distribution} />
        )}
        {legal && <TextBlock title="companyScreen.legal" text={legal} />}
        {/*!!! Pitch desk here */}

        {!!links.length && (
          <View>
            <Text style={baseStylesheet.titleText}>
              {t("companyScreen.media")}
            </Text>
            <FlatList
              data={links}
              renderItem={({ item }) => (
                <View style={styles.mediaCard}>
                  <View style={styles.mediaHeaderContainer}>
                    <Image
                      source={{ uri: item.icon }}
                      style={styles.mediaImage}
                    />
                    <Text style={styles.mediaHeaderText}>Name here</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => openBrowser(item.url)}
                  >
                    <Text style={styles.mediaLink}>{item.previewText}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  mediaCard: {
    marginBottom: 20,
  },
  mediaImage: {
    width: 30,
    height: 30,
  },
  mediaHeaderContainer: {
    marginBottom: 10,
    flex: 1,
    flexDirection: "row",
  },
  mediaHeaderText: {
    fontFamily: "montserrat-semi-bold",
    fontSize: 14,
    marginLeft: 10,
    color: colors.darkText,
  },
  mediaSubheader: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: colors.darkText,
  },
  mediaLink: {
    color: colors.lightBlue,
    fontSize: 14,
    fontFamily: "montserrat-regular",
  },
});

export default compose(withTranslation("translations"))(CompanyScreen);
