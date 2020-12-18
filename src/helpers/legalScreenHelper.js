import React from "react";
import { StyleSheet, Image } from "react-native";

import { isInvestor } from '../helpers/userTypeHelper';
import constants from "../constants";

const getLegalItems = (userRole) => {
  const userConstants =
  isInvestor(userRole)
      ? constants.investor
      : constants.entrepreneur;

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
      uri: userConstants.termsAndConditionsUri,
      pdf: userConstants.termsAndConditionsPDF,
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
      uri: userConstants.privacyPolicyUri,
      pdf: userConstants.privacyPolicyPDF,
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
          uri: userConstants.svpContractUri,
          pdf: userConstants.svpContractPDF,
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
          uri: userConstants.safeContractUri,
          pdf: userConstants.safeContractPDF,
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
      uri: userConstants.privacyPolicyUri,
      pdf: userConstants.privacyPolicyPDF,
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
      uri: userConstants.privacyPolicyUri,
      pdf: userConstants.privacyPolicyPDF,
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
