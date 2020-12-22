import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Content, Spinner } from "native-base";
import { withTranslation } from "react-i18next";
import HTML from "react-native-render-html";
import WebView from "react-native-webview";
import { baseStylesheet } from "../styles/baseStylesheet";
import DWG from "../../assets/DWG.svg";
import GrayHeader from "../components/grayHeader";
import PdfIcon from "../../assets/document-pdf.svg";
import { getLegalDoc } from "../redux/ducks/legal";
import { colors } from "../styles/colors";

class LegalDocumentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadStarted: false,
    };
  }

  componentDidMount() {
    const { item } = this.props.route.params;
    this.props.getLegalDoc(item.uri);
  }

  downloadPDF = () => {
    this.setState({ downloadStarted: true });
    setTimeout(() => this.setState({ downloadStarted: false }), 500);
  };

  render() {
    const { t, navigation, document } = this.props;
    const { item } = this.props.route.params;

    return (
      <>
        <GrayHeader
          title={t(`legalScreen.${item.title}`)}
          backButtonHandler={() => navigation.goBack()}
        />
        <Content style={baseStylesheet.baseContainer}>
          <View style={styles.imageContainer}>
            <DWG />
          </View>
          <View style={styles.itemContainer}>
            {document ? (
              <HTML html={document} />
            ) : (
              <Spinner color={colors.secondaryColor} />
            )}
            {this.state.downloadStarted && (
              <WebView source={{ uri: item.pdf }} />
            )}
          </View>
          <TouchableOpacity
            style={styles.row}
            onPress={() => this.downloadPDF(item)}
          >
            <PdfIcon />
            <Text style={styles.download}>
              {t("legalScreen.download")} {t(`legalScreen.${item.title}`)}
            </Text>
          </TouchableOpacity>
        </Content>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const userData = state.user.userData;
  const document = state.legal.document;
  return {
    userData,
    document,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLegalDoc: (uri) => dispatch(getLegalDoc(uri)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(LegalDocumentScreen);

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  itemContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  button: {
    width: "90%",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    margin: 15,
  },
  download: {
    textDecorationLine: "underline",
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: "montserrat-regular",
  },
});
