import React, { Component } from "react";
import { Item, Input } from "native-base";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
        {t("timeZoneModal.inputTitle")}
      </Text>
      <Item
        rounded
        style={baseStylesheet.inputItem}
      >
        <TouchableOpacity
          style={styles.touchableItem}
          onPress={
            () => this.handleClick(t("timeZoneModal.timeZoneTitle"))
          }
        >
          {
            this.props.value ?
              <Text
                style={styles.text}
              >
                {this.props.value}
              </Text>
              :
              <Text
                style={[
                  styles.text,
                  styles.placeholder,
                ]}
              >
                {t("timeZoneModal.placeholder")}
              </Text>
          }
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

const styles = StyleSheet.create({
  touchableItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    marginLeft: 0,
    marginRight: 5,
  },
  text: {
    width: "100%",
    fontSize: 16,
    fontFamily: "montserrat-regular",
    marginLeft: 10,
  },
  placeholder: {
    marginLeft: 10,
    color: colors.blueBorder,
  },
});