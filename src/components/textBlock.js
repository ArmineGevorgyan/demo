import React from 'react';
import { compose } from "redux";
import { StyleSheet, Text, View } from "react-native";
import { withTranslation } from "react-i18next";

import DividerLine from "../components/dividerLine";
import CollapsibleText from "../components/collapsibleText";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";

const TextBlock = ({
  t,
  title,
  text,
  renderTextPrefix,
  numberOfLines=6,
  titleStyles,
  textStyles,
  hasDivider=true
}) => (
  <View>
    <Text style={titleStyles ?? baseStylesheet.titleText}>
      {t(title)}
    </Text>
    {renderTextPrefix && renderTextPrefix()}
    <CollapsibleText
      text={text}
      numberOfLines={numberOfLines}
      textStyle={textStyles ?? styles.mainText}
    />
    {hasDivider && <DividerLine style={{ marginVertical: 10 }} />}
  </View>
);

const styles = StyleSheet.create({
  mainText: {
    marginBottom: 10,
    color: colors.darkText,
    fontFamily: "montserrat-regular"
  },
});

export default compose(withTranslation("translations"))(TextBlock);
