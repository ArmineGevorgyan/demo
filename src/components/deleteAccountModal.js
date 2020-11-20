import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Picker,
  ScrollView,
} from "react-native";
import { withTranslation } from "react-i18next";
import { Button, Label, Textarea } from "native-base";
import Modal from "react-native-modal";
import { Formik } from "formik";
import schema from "../validation/deleteAccountSchema";
import Validation from "../validation";
import { baseStylesheet } from "../styles/baseStylesheet";
import {
  getDeleteAccountReasons,
  closeDeleteAccountModal,
  openDeleteAccountSuccess,
  deleteAccountRequest,
} from "../redux/ducks/deleteAccount";
import DeleteAccountSuccess from "./deleteAccountSuccess";
import CustomPicker from "./picker";
import DraperRhino from "../../assets/draper-rhino.svg";
import { colors } from "../styles/colors";
import constants from "../constants";

class DeleteAccountModal extends Component {
  componentDidMount() {
    this.props.getDeleteAccountReasons();
  }

  onSubmit = (values) => this.props.deleteAccountRequest(values);

  handleCancel = () => this.props.closeDeleteAccountModal();

  componentDidUpdate() {
    const {
      requestSent,
      closeDeleteAccountModal,
      openDeleteAccountSuccess,
    } = this.props;

    if (!requestSent) {
      return;
    }

    closeDeleteAccountModal();
    openDeleteAccountSuccess();
  }

  render() {
    const { t, isModalOpen, reasons } = this.props;

    return (
      <>
        <Modal
          isVisible={isModalOpen}
          backdropOpacity={0.5}
          onBackButtonPress={() => this.handleCancel()}
        >
          <View style={baseStylesheet.modalView}>
            <View style={styles.imageContainer}>
              <DraperRhino />
            </View>
            <ScrollView>
              <View style={styles.alertImageContainer}>
                <Image
                  style={styles.alertIcon}
                  source={require("../../assets/alert.png")}
                />
              </View>

              <Text style={styles.contextHeading}>
                {t("deleteAccountModal.contextHeading")}
              </Text>
              <Text style={[baseStylesheet.mainContentText, styles.text]}>
                {t("deleteAccountModal.context")}
              </Text>

              <Formik
                initialValues={{
                  reason: "",
                  message: "",
                }}
                validationSchema={schema}
                onSubmit={this.onSubmit}
              >
                {(props) => {
                  let length = props.values.message.length;

                  return (
                    <View style={styles.formContainer}>
                      <Validation name="reason" showMessage={true}>
                        <CustomPicker
                          selectedValue={props.values.reason}
                          onValueChange={(itemValue) =>
                            props.setFieldValue("reason", itemValue)
                          }
                          value={props.values.reason}
                        >
                          <Picker.Item
                            value=""
                            label={t("deleteAccountModal.selectReason")}
                            color={colors.blueBorder}
                          />
                          {reasons &&
                            reasons.map((type) => (
                              <Picker.Item
                                label={type.name}
                                color="black"
                                value={type}
                              />
                            ))}
                        </CustomPicker>
                      </Validation>
                      {props.values.reason?.name ==
                        constants.deleteAccountReasons.other && (
                        <View style={styles.message}>
                          <View style={styles.row}>
                            <Label style={baseStylesheet.label}>
                              {t("deleteAccountModal.message")}
                            </Label>
                            <Text style={styles.counter}>
                              {length}/{constants.deleteAccountMessageMaxLength}
                            </Text>
                          </View>
                          <Validation name="message" showMessage={true}>
                            <Textarea
                              maxLength={
                                constants.deleteAccountMessageMaxLength
                              }
                              rowSpan={4}
                              style={baseStylesheet.textarea}
                              bordered
                              value={props.values.message || ""}
                              onChangeText={props.handleChange("message")}
                            />
                          </Validation>
                        </View>
                      )}
                      <View style={styles.buttonView}>
                        <Button
                          style={[baseStylesheet.mainButton, styles.button]}
                          onPress={props.handleSubmit}
                        >
                          <Text style={baseStylesheet.mainButtonText}>
                            {t("deleteAccountModal.submitButton")}
                          </Text>
                        </Button>
                        <TouchableOpacity onPress={() => this.handleCancel()}>
                          <Text style={baseStylesheet.grayButtonText}>
                            {t("deleteAccountModal.cancelButton")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              </Formik>
            </ScrollView>
          </View>
        </Modal>
        <DeleteAccountSuccess />
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const isModalOpen = state.deleteAccount.deleteAccountModalOpen;
  const requestSent = state.deleteAccount.deleteRequestSent;
  const reasons = state.deleteAccount.deleteAccountReasons;

  return {
    isModalOpen,
    requestSent,
    reasons,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeDeleteAccountModal: () => dispatch(closeDeleteAccountModal()),
    openDeleteAccountSuccess: () => dispatch(openDeleteAccountSuccess()),
    deleteAccountRequest: () => dispatch(deleteAccountRequest()),
    getDeleteAccountReasons: () => dispatch(getDeleteAccountReasons()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(DeleteAccountModal);

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: "10%",
    alignItems: "center",
  },
  alertImageContainer: {
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
  formContainer: {
    padding: 2,
  },
  buttonView: {
    width: "100%",
  },
  button: {
    marginBottom: 25,
  },
  alertIcon: {
    height: 40,
    width: 40,
  },
  message: { marginBottom: 10, width: "100%" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  counter: {
    color: colors.darkText,
    fontSize: 10,
    fontFamily: "montserrat-regular",
  },
});
