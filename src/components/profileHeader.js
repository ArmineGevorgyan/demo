import React, { Component } from "react";
import { Icon } from "native-base";
import { Image, StyleSheet, Text, View } from "react-native";
import BlueHeader from "./blueHeader";
import { colors } from "../styles/colors";
import constants from "../constants";

class ProfileHeader extends Component {
  render() {
    const {
      title,
      subtitle,
      photoUrl,
      children,
      backButtonHandler,
    } = this.props;

    return (
      <>
        <BlueHeader
          style={subtitle ? styles.blueHeaderWithSubtitle : styles.blueHeader}
        >
          <View style={subtitle ? "" : styles.headerRow}>
            <View style={styles.backButton}>
              {backButtonHandler && (
                <Icon
                  style={styles.icon}
                  name="arrow-left"
                  type="Feather"
                  onPress={backButtonHandler}
                />
              )}
            </View>
            <Text style={styles.headerTitle}>{title}</Text>
            {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
            <View
              style={{
                minWidth: 30,
              }}
            ></View>
          </View>
          {children}
        </BlueHeader>
        <View style={styles.imageContainer}>
          <Image source={{ uri: photoUrl }} style={styles.photo} />
        </View>
      </>
    );
  }
}

export default ProfileHeader;

const styles = StyleSheet.create({
  headerTitle: {
    color: colors.mainButtonText,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "montserrat-light",
    marginBottom: 5,
  },
  headerSubtitle: {
    color: colors.mainButtonText,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    marginBottom: 5,
  },
  headerRow: {
    marginTop: "12%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    color: "#FFF",
  },
  backButton: {
    marginLeft: 17,
    minHeight: "15%",
    minWidth: 30,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-14%",
    marginBottom: 10,
  },
  photo: {
    height: 140,
    width: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "white",
  },
  blueHeader: {
    height: constants.blueHeaderHeight - 40,
  },
  blueHeaderWithSubtitle: {
    paddingTop: "10%",
    height: constants.blueHeaderHeight,
  },
});
