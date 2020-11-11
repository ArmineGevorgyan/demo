import React from "react";
import { StyleSheet, Image } from "react-native";
import constants from "../constants";

const getLegalItems = (userRole) => {
  const data = [
    {
      title: "termsAndConditions",
      description: "tcDescription",
      image: (
        <Image
          style={styles.icon}
          source={require("../../assets/terms-conditions.png")}
        />
      ),
      to: "TemporaryScreen",
    },
    {
      title: "privacyPolicy",
      description: "ppDescription",
      image: (
        <Image
          style={styles.icon}
          source={require("../../assets/privacy-policy.png")}
        />
      ),
      to: "TemporaryScreen",
    },
    userRole === constants.userRole.investor
      ? {
          title: "svpCreation",
          description: "svpDescription",
          image: (
            <Image
              style={styles.icon}
              source={require("../../assets/svp-creation.png")}
            />
          ),
          to: "TemporaryScreen",
        }
      : {
          title: "safeContract",
          description: "safeDescription",
          image: (
            <Image
              style={styles.icon}
              source={require("../../assets/safe-contract.png")}
            />
          ),
          to: "TemporaryScreen",
        },
    {
      title: "legalArticles",
      description: "legalArticlesDescription",
      image: (
        <Image
          style={styles.icon}
          source={require("../../assets/legal-articles.png")}
        />
      ),
      to: "TemporaryScreen",
    },
    {
      title: "legalTemplates",
      description: "legalTemplatesDescription",
      image: (
        <Image
          style={styles.icon}
          source={require("../../assets/legal-templates.png")}
        />
      ),
      to: "TemporaryScreen",
    },
  ];

  return data;
};

export default getLegalItems;

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});
