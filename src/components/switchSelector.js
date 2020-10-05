import React, { Component } from "react";
import { StyleSheet } from "react-native";
import ReactNativeSwitchSelector from "react-native-switch-selector";
import { colors } from "../styles/colors";

class SwitchSelector extends Component {
  render() {
    const {
      disabled = false,
      options,
      value,
      initial = 0,
      onPress,
    } = this.props;

    if (disabled) {
      return (
        <ReactNativeSwitchSelector
          style={[styles.switchSelector]}
          initial={initial}
          textColor={colors.disabledText}
          backgroundColor={colors.disabledInput}
          selectedColor={colors.mainButtonText}
          buttonColor={colors.disabledSwitch}
          borderColor={colors.disabledBorder}
          height={50}
          fontSize={18}
          hasPadding
          value={value}
          options={options}
          disabled={true}
        />
      );
    }

    return (
      <ReactNativeSwitchSelector
        style={[styles.switchSelector]}
        initial={initial}
        onPress={onPress}
        textColor={colors.darkText}
        selectedColor={colors.mainButtonText}
        buttonColor={colors.mainButton}
        borderColor={colors.lightBorder}
        height={50}
        fontSize={18}
        hasPadding
        options={options}
      />
    );
  }
}

const styles = StyleSheet.create({
  switchSelector: {
    marginBottom: 25,
    width: "100%",
    height: 30,
  },
});

export default SwitchSelector;
