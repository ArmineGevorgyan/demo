import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { withTranslation } from "react-i18next";
import { compose } from "redux";
import HTML from "react-native-render-html";

import { colors } from "../styles/colors";

const CollapsibleHTML = ({ numberOfLines = 6, t, text }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [height, setHeight] = useState(100);
  const allowedHeight = 25 * numberOfLines; //25 - approximate line height
  const heightIsNotAllowed = height > allowedHeight;

  return (
    <View>
      <View onLayout={(e) => setHeight(e.nativeEvent.layout.height)}>
        <HTML
          html={text}
          containerStyle={
            isCollapsed
              ? { ...styles.mainText, maxHeight: allowedHeight, overflow: "hidden" }
              : styles.mainText
          }
        />
      </View>
      {heightIsNotAllowed && (
        <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
          <Text style={styles.seeText}>
            {isCollapsed
              ? t("collapsibleText.seeMore")
              : t("collapsibleText.seeLess")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  seeText: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
    color: colors.lightBlue,
  },
  mainText: {
    marginBottom: 10,
    color: colors.darkText,
  },
});

export default compose(withTranslation("translations"))(CollapsibleHTML);
