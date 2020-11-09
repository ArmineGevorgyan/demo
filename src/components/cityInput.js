import React, { Component } from "react";
import { Item, Input } from "native-base";
import { View, Text, TouchableOpacity } from "react-native";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { colors } from "../styles/colors";
import { baseStylesheet } from "../styles/baseStylesheet";
import DropdownInputModal from "../components/dropdownInputModal";
import Flag from 'react-native-flags';
import {
  openModal,
  closeModal,
  setType,
} from "../redux/ducks/dropdownInputModal";

class CityInput extends Component {
  handleClick = (title) => {
    this.props.openModal(title);
    this.props.setType(this.props.inputType);
  }

  render() {
    const { t } = this.props;
    return (<View style={{
      width:"100%"}}>
      <Text style={{
        fontSize: 16,
        color: colors.lightBlue,
      }}>
        {this.props.title}
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
            // width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Flag
            code={this.props.flagCode || "US"}
            size={32}
            style={{marginLeft:10,}}
          />
          <Input
            disabled
            blurOnSubmit={false}
            style={{ ...baseStylesheet.inputField }}
            placeholder={t("dropDownInputModal.placeholder")}
            placeholderTextColor={colors.lightText}
            value={this.props.value || ""}
          />
        </TouchableOpacity>
      </Item>
      <DropdownInputModal
        isModalOpen={this.props.isModalOpen}
        closeModal={this.props.closeModal}
        setResult={this.props.setResult}
        inputType={this.props.inputType}
      />
    </View>
    )
  };
};


const mapStateToProps = (state, props) => {
  const isModalOpen = state.dropdownInputModal.isModalOpen;

  return {
    isModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (title) => dispatch(openModal(title)),
    closeModal: () => dispatch(closeModal()),
    setType:(type)=>dispatch(setType(type)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(CityInput);