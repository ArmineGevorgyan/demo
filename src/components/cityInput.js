import React, { Component } from "react";
import { Item } from "native-base";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
    return (
      <View
        style={{
          width: "100%"
        }}
      >
        <Text style={baseStylesheet.label}>
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
            style={styles.touchableItem}
          >
            {
              this.props.flagCode !== "" && (
                <Flag
                  code={this.props.flagCode}
                  size={32}
                  style={styles.flag}
                />
              )
            }
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
                  {t("dropDownInputModal.placeholder")}
                </Text>
            }
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
    setType: (type) => dispatch(setType(type)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(CityInput);

const styles = StyleSheet.create({
  touchableItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    marginLeft: 10,
    marginRight: 5,
  },
  text: {
     flex: 1,
    fontSize: 16,
    fontFamily: "montserrat-regular",
    
  },
  placeholder: {
    marginLeft: 10,
    color: colors.blueBorder,
  },
});