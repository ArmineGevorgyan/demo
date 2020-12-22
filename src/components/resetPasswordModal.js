import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View, Image } from "react-native";
import Modal from "react-native-modal";
import { withTranslation } from "react-i18next";
import { baseStylesheet } from "../styles/baseStylesheet";
import DWG from "../../assets/DWG.svg";
import { closeModal } from "../redux/ducks/resetPassword";
import { colors } from "../styles/colors";
import { Button } from "native-base";

class ResetPasswordModal extends Component {
  handleCancel = () => {
    const { closeModal } = this.props;

    closeModal();
  };

  render() {
    const { t, email, isModalOpen, error } = this.props;

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
          <View style={styles.imageContainer}>
            <Image
              style={styles.successIcon}
              source={
                error
                  ? require("../../assets/email-fail.png")
                  : require("../../assets/request-success.png")
              }
            />
          </View>
          {error ? (
            <Text style={baseStylesheet.mainContentText}>
              {t("resetPasswordModal.failureMessage")}
            </Text>
          ) : (
            <View>
              <Text style={[baseStylesheet.mainContentText, styles.text]}>
                {t("resetPasswordModal.contextLine1")}
              </Text>
              <Text style={styles.boldText}>{email}</Text>
              <Text style={baseStylesheet.mainContentText}>
                {t("resetPasswordModal.contextLine2")}
              </Text>
            </View>
          )}
          <Button
            style={baseStylesheet.grayButton}
            onPress={() => this.handleCancel()}
          >
            <Text style={baseStylesheet.grayButtonText}>
              {t("resetPasswordModal.closeButton")}
            </Text>
          </Button>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state, props) => {
  const isModalOpen = state.resetPassword.isModalOpen;

  return {
    isModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(ResetPasswordModal);

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: "10%",
    alignItems: "center",
  },
  text: {
    marginBottom: 0,
  },
  boldText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "montserrat-semi-bold",
    color: colors.mainText,
    marginBottom: "8%",
  },
  successIcon: {
    width: 100,
    height: 70,
  },
  buttonView: {
    width: "100%",
    marginBottom: "15%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
});
