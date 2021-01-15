import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { withTranslation } from "react-i18next";
import { compose } from "redux";

import DividerLine from "./dividerLine";
import CollapsibleHTML from "./collapsibleHTML";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";

const StartupTextBlock = ({
  titleText,
  fieldName,
  id,
  content,
  navigate,
  navigateTo,
  isLast,
  isHTML = true,
  t,
}) => (
  <>
    <TouchableOpacity
      onPress={() =>
        navigate(navigateTo, {
          title: t(titleText),
          editingField: fieldName,
          id,
        })
      }
    >
      <Text style={{ ...baseStylesheet.titleText, marginBottom: 10 }}>
        {t(titleText)}
      </Text>
    </TouchableOpacity>
    {isHTML ? (
      <CollapsibleHTML text={content} />
    ) : (
      <CollapsibleText text={content} textStyle={styles.mainText} />
    )}
    {!isLast && <DividerLine style={{ marginVertical: 10 }} />}
  </>
);

const styles = StyleSheet.create({
  mainText: {
    marginBottom: 10,
    color: colors.darkText,
  },
});

export default compose(withTranslation("translations"))(StartupTextBlock);
