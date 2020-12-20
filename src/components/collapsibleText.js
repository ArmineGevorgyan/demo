import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { withTranslation } from "react-i18next";
import { compose } from 'redux';

import { colors } from "../styles/colors";

const CollapsibleText = ({ textStyle, numberOfLines, t, text }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <View>
      {isCollapsed ? <Text style={textStyle} numberOfLines={numberOfLines}>
        {text}
      </Text> : <Text style={textStyle}>
        {text}
      </Text>}
      <TouchableOpacity onPress={() => isCollapsed ? setIsCollapsed(false) : setIsCollapsed(true)}>
        <Text style={innerStyles.seeText}>
          {isCollapsed ? t("collapsibleText.seeMore") : t("collapsibleText.seeLess")}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const innerStyles = StyleSheet.create({
  seeText: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
    color: colors.lightBlue
  },
});

export default compose(
  withTranslation("translations")
)(CollapsibleText);