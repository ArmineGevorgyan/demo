import React from "react";
import { StyleSheet, View, Picker } from "react-native";
import { Icon } from "native-base";

import { colors } from "../styles/colors";
import { baseStylesheet } from "../styles/baseStylesheet";

class CustomPicker extends React.Component {
  render() {
    const { selectedValue, value, children, onValueChange } = this.props;

    return (
      <View style={[styles.picker, baseStylesheet.inputItem]}>
        <Icon name="chevron-down" type="Feather" style={styles.pickerIcon} />
        <Picker
          selectedValue={selectedValue}
          style={{ width: "100%" }}
          onValueChange={onValueChange}
          value={value}
          selectedItemColor="black"
        >
          {children}
        </Picker>
      </View>
    );
  }
}

export default CustomPicker;

const styles = StyleSheet.create({
  picker: { width: "100%", borderRadius: 25, overflow: "hidden" },
  pickerIcon: {
    color: colors.lightBlue,
    backgroundColor: "white",
    zIndex: 1,
    position: "absolute",
    bottom: 12,
    right: 25,
    fontSize: 25,
  },
});
