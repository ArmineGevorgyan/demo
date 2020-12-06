import React, { Component } from "react";
import { Icon } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/colors";

class GrayHeader extends Component {
  render() {
    const { title, children, enableSearch, backButtonHandler } = this.props;

    return (
      <View
        style={[
          styles.container,
          children ? styles.withCildren : styles.withoutChildren,
        ]}
      >
        <View style={styles.textRowContainer}>
          <View style={{ minWidth: 30 }}>
            {backButtonHandler && (
              <Icon
                style={{
                  color: colors.backIconBlue,
                }}
                name="arrow-left"
                type="Feather"
                onPress={backButtonHandler}
              />
            )}
          </View>
          <Text style={[styles.headerText, children && { marginBottom: 15 }]}>
            {title}
          </Text>
          <View
            style={{
              minWidth: 30,
            }}
          >
            {enableSearch && (
              <Icon
                style={{
                  color: colors.darkText,
                }}
                name="search"
                type="Feather"
              />
            )}
          </View>
        </View>
        {children}
      </View>
    );
  }
}

export default GrayHeader;

const styles = StyleSheet.create({
  container: {
    paddingLeft: "7%",
    paddingRight: "7%",
    backgroundColor: colors.offWhite,
    borderBottomColor: colors.blueBorder,
    borderBottomWidth: 1,
  },
  withCildren: {
    paddingTop: 50,
  },
  withoutChildren: {
    paddingTop: 25,
    height: 100,
    justifyContent: "center",
  },
  textRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    paddingLeft: 10,
    paddingRight: 10,
    color: colors.blackBlue,
    fontSize: 30,
    fontFamily: "montserrat-light",
    textAlign: "center",
  },
});
