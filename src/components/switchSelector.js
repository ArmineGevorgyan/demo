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
      large = false,
    } = this.props;

    const height = large ? 50 : 32;
    const fontSize = large ? 18 : 14;

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
          height={height}
          fontSize={fontSize}
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
        height={height}
        fontSize={fontSize}
        hasPadding
        options={options}
      />
    );
  }
}

const styles = StyleSheet.create({
  switchSelector: {
    marginBottom: 15,
    width: "100%",
    backgroundColor: "white",
  },
});

export default SwitchSelector;
