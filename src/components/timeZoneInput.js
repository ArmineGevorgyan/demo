import React, { Component } from "react";
import { Item, Input } from "native-base";
import { View, Text, TouchableOpacity } from "react-native";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { colors } from "../styles/colors";
import { baseStylesheet } from "../styles/baseStylesheet";
import TimeZoneModal from "../components/timeZoneModal";
import {
  openModal,
  closeModal,
  loadTimeZones,
} from "../redux/ducks/timeZoneModal";

class TimeZoneInput extends Component {

  handleClick = (title) => {
    this.props.openModal(title);
    this.props.loadTimeZones();
  }

  render() {
    const { t } = this.props;
    return (<View>
      <Text style={baseStylesheet.label}>
        {t("tomeZoneModal.inputTitle")}
    </Text>
      <Item
        rounded
        style={baseStylesheet.inputItem}
      >
        <TouchableOpacity
          onPress={
            () => this.handleClick(t("dropDownInputModal.locationTitle"))
          }
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Input
            disabled
            blurOnSubmit={false}
            style={{ ...baseStylesheet.inputField, width: "100%" }}
            placeholder={t("tomeZoneModal.placeholder")}
            placeholderTextColor={colors.blueBorder}
            value={this.props.value || ""}
          />
        </TouchableOpacity>
      </Item>
      <TimeZoneModal
        isModalOpen={this.props.isModalOpen}
         closeModal={this.props.closeModal}
         setResult={this.props.setResult}
      />
    </View>
    )
  };
};


const mapStateToProps = (state, props) => {
  const isModalOpen = state.timeZoneModal.isModalOpen;

  return {
    isModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (title) => dispatch(openModal(title)),
    closeModal: () => dispatch(closeModal()),
    loadTimeZones: () => dispatch(loadTimeZones()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(TimeZoneInput);