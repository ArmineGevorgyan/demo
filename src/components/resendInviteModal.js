import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import Modal from "react-native-modal";
import { withTranslation } from "react-i18next";
import { baseStylesheet } from "../styles/baseStylesheet";
import {
  openModal,
  closeModal,
  resendInvite,
} from "../redux/ducks/resendInvite";
import DWG from "../../assets/DWG.svg";
import Email from "../../assets/email.svg";

class ResendInviteModal extends Component {
  handleResend = () => {
    const { resendInvite, email } = this.props;

    resendInvite(email);
  };

  handleCancel = () => {
    const { closeModal } = this.props;

    closeModal();
  };

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
          <Text style={styles.header}>{t("resendInviteModal.header")}</Text>
          <View style={styles.imageContainer}>
            <Email style={styles.emailImage} />
          </View>
          <Text style={baseStylesheet.mainContentText}>
            {t("resendInviteModal.contextLine1")}
          </Text>
          <Text style={baseStylesheet.mainContentText}>
            {t("resendInviteModal.contextLine2")}
          </Text>

          <View style={styles.buttonView}>
            <Button
              style={baseStylesheet.secondaryButton}
              onPress={() => this.handleResend()}
            >
              <Text style={baseStylesheet.secondaryButtonText}>
                {t("resendInviteModal.resendButton")}
              </Text>
            </Button>
          </View>

          <TouchableOpacity onPress={() => this.handleCancel()}>
            <Text style={baseStylesheet.tertiaryButton}>
              {t("resendInviteModal.closeButton")}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state, props) => {
  const isModalOpen = state.resendInvite.isModalOpen;
  const email = state.authentication.email;

  return {
    isModalOpen,
    email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal()),
    resendInvite: (email) => dispatch(resendInvite(email)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(ResendInviteModal);

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: "10%",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "montserrat-light",
    marginBottom: "10%",
  },
  buttonView: {
    width: "100%",
    marginBottom: "15%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
});
