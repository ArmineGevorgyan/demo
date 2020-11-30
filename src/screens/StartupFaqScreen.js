import React, { Component } from "react";
import { View, StyleSheet, } from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";

class StartupFaqScreen extends Component {
  render() {
    const { t } = this.props;

    return (
      <View style={{
        paddingTop: 70,
      }}>
        <Text style={styles.noFaqTitle}>
          {t("startupFaq.noFaqTitle")}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "montserrat-regular",
          }}>
          {t("startupFaq.noFaqDescription")}
        </Text>
      </View>
    )
  };
};

const mapStateToProps = (state, props) => {

  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(StartupFaqScreen);

const styles = StyleSheet.create({
  noFaqTitle: {
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 22,
    paddingBottom: 22,
    fontFamily: "montserrat-medium",
  },
});