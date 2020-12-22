import React, { Component } from "react";
import { StyleSheet, Text, View, Keyboard } from "react-native";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { colors } from "../styles/colors";
import { hideCopyright, showCopyright } from "../redux/ducks/copyright";

class Copyright extends Component {
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount = () => {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  _keyboardDidShow = () => {
    this.props.hideCopyright();
  };

  _keyboardDidHide = () => {
    this.props.showCopyright();
  };

  render() {
    const { t, show } = this.props;

    return (
      <>
        {!show ? (
          <></>
        ) : (
          <View style={styles.copyrightContainer}>
            <Text style={styles.copyright}>{t("landingScreen.copyright")}</Text>
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const show = state.copyright.show;

  return {
    show,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showCopyright: () => dispatch(showCopyright()),
    hideCopyright: () => dispatch(hideCopyright()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(Copyright);

const styles = StyleSheet.create({
  copyrightContainer: {
    position: "absolute",
    bottom: 15,
    width: "100%",
  },
  copyright: {
    textAlign: "center",
    color: colors.darkText,
    fontFamily: "montserrat-regular",
    fontSize: 10,
  },
});
