import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View, Image } from "react-native";
import { withTranslation } from "react-i18next";
import { Button } from "native-base";
import Modal from "react-native-modal";
import { baseStylesheet } from "../styles/baseStylesheet";
import { closeInfoSessionSuccessModal } from "../redux/ducks/infoSession";
import DWG from "../../assets/DWG.svg";

class JoinInfoSessionSuccess extends Component {
  handleCancel = () => this.props.closeInfoSessionSuccessModal();

  render() {
    const { t, isModalOpen } = this.props;

    return (
      <Modal
        isVisible={isModalOpen}
        backdropOpacity={0.5}
        onBackButtonPress={() => this.handleCancel()}
      >
        <View style={baseStylesheet.modalView}>
          <View style={styles.imageContainer}>
            <DWG />
          </View>
          <View style={styles.infoImageContainer}>
            <Image
              style={styles.infoIcon}
              source={require("../../assets/info.png")}
            />
          </View>

          <Text style={styles.contextHeading}>
            {t("joinInfoSessionSuccess.contextHeading")}
          </Text>
          <Text style={[baseStylesheet.mainContentText, styles.text]}>
            {t("joinInfoSessionSuccess.context")}
          </Text>
          <View style={styles.buttonView}>
            <Button
              style={[baseStylesheet.secondaryButton, styles.button]}
              onPress={() => this.props.closeInfoSessionSuccessModal()}
            >
              <Text style={baseStylesheet.secondaryButtonText}>
                {t("joinInfoSessionSuccess.OKButton")}
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state, props) => {
  const isModalOpen = state.infoSession.isInfoSessionSuccessModalOpen;

  return {
    isModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeInfoSessionSuccessModal: () =>
      dispatch(closeInfoSessionSuccessModal()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(JoinInfoSessionSuccess);

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: "10%",
    alignItems: "center",
  },
  infoImageContainer: {
    marginBottom: "6%",
    alignItems: "center",
  },
  contextHeading: {
    fontSize: 14,
    marginBottom: "5%",
    textAlign: "center",
    fontFamily: "montserrat-semi-bold",
    zIndex: 1,
  },
  text: {
    fontSize: 14,
  },
  buttonView: {
    width: "100%",
  },
  button: {
    marginBottom: 25,
  },
  infoIcon: {
    height: 40,
    width: 40,
  },
});
