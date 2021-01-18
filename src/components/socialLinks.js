import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { colors } from "../styles/colors";
import Linkedin from "../../assets/linkedin.svg";
import Angellist from "../../assets/angellist.svg";
import Crunchbase from "../../assets/crunchbase.svg";
import i18n from "../i18n";

const openBrowser = async (profileUrl) => {
  await WebBrowser.openBrowserAsync(profileUrl);
};

export const linkedin = (profileUrl, noText) =>
  profileUrl && (
    <TouchableOpacity
      style={styles.social}
      onPress={() => openBrowser(profileUrl)}
    >
      <Linkedin />
      {!noText && (
        <Text style={styles.link}>{i18n.t("socialLinks.linkedinProfile")}</Text>
      )}
    </TouchableOpacity>
  );

export const crunchbase = (profileUrl, noText) =>
  profileUrl && (
    <TouchableOpacity
      style={styles.social}
      onPress={() => openBrowser(profileUrl)}
    >
      <Crunchbase />
      {!noText && (
        <Text style={styles.link}>
          {i18n.t("socialLinks.crunchbaseProfile")}
        </Text>
      )}
    </TouchableOpacity>
  );

export const angellist = (profileUrl, noText) =>
  profileUrl && (
    <TouchableOpacity
      style={styles.social}
      onPress={() => openBrowser(profileUrl)}
    >
      <Angellist />
      {!noText && (
        <Text style={styles.link}>
          {i18n.t("socialLinks.angelListProfile")}
        </Text>
      )}
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  social: {
    flexDirection: "row",
    marginBottom: 12,
    marginRight: 10,
  },
  link: {
    color: colors.lightBlue,
    alignSelf: "center",
  },
});
