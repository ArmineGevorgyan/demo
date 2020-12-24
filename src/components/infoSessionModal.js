import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { withTranslation } from "react-i18next";
import { Button, Spinner } from "native-base";
import Modal from "react-native-modal";
import moment from "moment-timezone";
import * as Localization from "expo-localization";
import { baseStylesheet } from "../styles/baseStylesheet";
import {
  closeInfoSessionModal,
  joinInfoSession,
} from "../redux/ducks/infoSession";
import DWG from "../../assets/DWG.svg";
import { colors } from "../styles/colors";

class InfoSessionModal extends Component {
  render() {
    const {
      t,
      isModalOpen,
      isLoading,
      infoSession,
      closeInfoSessionModal,
      joinInfoSession,
      startup,
    } = this.props;

    const time =
      !!infoSession && moment(infoSession.heldOn).tz(Localization.timezone);

    return (
      <>
        {!!infoSession && (
          <Modal
            isVisible={isModalOpen}
            backdropOpacity={0.5}
            onBackButtonPress={() => closeInfoSessionModal()}
          >
            <View style={[baseStylesheet.modalView, styles.modal]}>
              <DWG style={styles.logo} />
              {isLoading ? (
                <Spinner color={colors.secondaryColor} />
              ) : (
                <>
                  <Text style={styles.title}>
                    {t("infoSessionModal.infoSession")}
                  </Text>
                  <View style={styles.row}>
                    <Image
                      style={styles.infoIcon}
                      source={require("../../assets/zoom.png")}
                    />
                    <Text style={styles.text}>
                      {t("infoSessionModal.zoom")}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Image
                      style={styles.infoIcon}
                      source={require("../../assets/calendar.png")}
                    />
                    <Text style={styles.text}>
                      {t("infoSessionModal.tapToJoin")}
                    </Text>
                  </View>
                  <Text style={styles.dateTitle}>
                    {t("infoSessionModal.date")}
                  </Text>
                  <Text style={styles.date}>{moment(time).format("LLLL")}</Text>
                  <View style={styles.buttonView}>
                    <Button
                      style={[
                        baseStylesheet.mainButton,
                        !!infoSession.joined && styles.disabledButton,
                      ]}
                      onPress={() =>
                        joinInfoSession(infoSession.id, startup.id)
                      }
                      disabled={infoSession.joined}
                    >
                      <Text style={baseStylesheet.mainButtonText}>
                        {infoSession.joined
                          ? t("infoSessionModal.joined")
                          : t("infoSessionModal.join")}
                      </Text>
                    </Button>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => closeInfoSessionModal()}
                    >
                      <Text style={baseStylesheet.grayButtonText}>
                        {t("infoSessionModal.cancelButton")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </Modal>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const isModalOpen = state.infoSession.isModalOpen;
  const infoSession = state.infoSession.upcomingInfoSession;
  const isLoading = state.infoSession.isLoading;

  return {
    isModalOpen,
    infoSession,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeInfoSessionModal: () => dispatch(closeInfoSessionModal()),
    joinInfoSession: (id, startupId) =>
      dispatch(joinInfoSession(id, startupId)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(InfoSessionModal);

const styles = StyleSheet.create({
  modal: {
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: "5%",
  },
  title: {
    fontSize: 30,
    fontFamily: "montserrat-light",
    textTransform: "uppercase",
    color: colors.blackBlue,
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 20,
  },
  logo: {
    alignSelf: "center",
  },
  infoIcon: {
    height: 40,
    width: 40,
  },
  row: {
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    fontFamily: "montserrat-regular",
    marginLeft: 10,
    width: "80%",
    marginBottom: 20,
  },
  dateTitle: {
    fontSize: 16,
    fontFamily: "montserrat-semi-bold",
    alignSelf: "center",
  },
  buttonView: {
    marginTop: 10,
    marginBottom: 15,
    width: "90%",
    alignSelf: "center",
  },
  disabledButton: {
    backgroundColor: colors.disabledText,
  },
  date: {
    fontSize: 16,
    fontFamily: "montserrat-regular",
    color: colors.lightBlue,
    alignSelf: "center",
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  button: {
    marginTop: 10,
  },
});
