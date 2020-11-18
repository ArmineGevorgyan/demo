import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View } from "react-native";
import { Content, Button } from "native-base";
import { withTranslation } from "react-i18next";
import HTML from "react-native-render-html";
import { baseStylesheet } from "../styles/baseStylesheet";
import DraperRhino from "../../assets/draper-rhino.svg";
import GrayHeader from "../components/grayHeader";
import { getLegalDoc } from "../redux/ducks/legal";

class LegalDocumentScreen extends Component {
  componentDidMount() {
    const { item } = this.props.route.params;

    this.props.getLegalDoc(item.uri);
  }

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
            <DraperRhino />
          </View>
          <View style={styles.itemContainer}>
            {document && <HTML html={document} />}
          </View>
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
    marginBottom: 120,
  },
  button: {
    width: "90%",
  },
});
