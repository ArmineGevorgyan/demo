import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { withTranslation } from "react-i18next";
import { compose } from "redux";
import { colors } from "../styles/colors";

const CollapsibleText = ({ textStyle, numberOfLines, t, text }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [lineCount, setLineCount] = useState(0);

  const onTextLayout = e => {
    setLineCount(e.nativeEvent.lines.length);
  };

  return (
    <View>
      <Text
        style={textStyle}
        numberOfLines={isCollapsed ? numberOfLines : null}
        onTextLayout={onTextLayout}
      >
        {text}
      </Text>
      {lineCount > 6 && <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
        <Text style={innerStyles.seeText}>
          {isCollapsed
            ? t("collapsibleText.seeMore")
            : t("collapsibleText.seeLess")}
        </Text>
      </TouchableOpacity>}
    </View>
  );
};

const innerStyles = StyleSheet.create({
  seeText: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
    color: colors.lightBlue,
  },
});

export default compose(withTranslation("translations"))(CollapsibleText);
