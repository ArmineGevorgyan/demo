import React, { Component } from "react";
import { compose } from "redux";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { Content } from "native-base";
import { withTranslation } from "react-i18next";
import * as WebBrowser from "expo-web-browser";
import moment from "moment";
import WebView from "react-native-webview";
import Flag from "react-native-flags";

import PdfIcon from "../../assets/document-pdf.svg";
import DividerLine from "../components/dividerLine";
import { baseStylesheet } from "../styles/baseStylesheet";
import TextBlock from "../components/textBlock";
import { colors } from "../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const openBrowser = async (url) => {
  await WebBrowser.openBrowserAsync(url);
};
class CompanyScreen extends Component {
  state = {
    downloadStarted: false,
  };

  downloadPDF = () => {
    this.setState({ downloadStarted: true });
    setTimeout(() => this.setState({ downloadStarted: false }), 500);
  };

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

    const parsedFounded = moment(
      founded?.slice(0, founded?.indexOf("T"))
    ).format("DD.MM.YYYY");

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
            renderTextPrefix={() => (
              <Flag code={isoCode} size={32} style={{ marginRight: 10 }} />
            )}
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
        {!!pitchDeckUrl && (
          <View>
            <Text style={baseStylesheet.titleText}>
              {t("companyScreen.pitchDeck")}
            </Text>
            {this.state.downloadStarted && (
              <WebView source={{ uri: pitchDeckUrl }} />
            )}
            <TouchableOpacity style={styles.PDFRow} onPress={this.downloadPDF}>
              <PdfIcon />
              <Text style={styles.downloadPDF}>
                {t("companyScreen.downloadPDF")}
              </Text>
            </TouchableOpacity>
            <DividerLine style={{ marginVertical: 10 }} />
          </View>
        )}
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
                    <Text style={styles.mediaHeaderText}>{item.title}</Text>
                  </View>
                  <TouchableOpacity onPress={() => openBrowser(item.url)}>
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
  PDFRow: {
    flexDirection: "row",
  },
  downloadPDF: {
    marginLeft: 10,
    textDecorationLine: "underline",
    fontFamily: "montserrat-regular",
    fontSize: 14
  }
});

export default compose(withTranslation("translations"))(CompanyScreen);
