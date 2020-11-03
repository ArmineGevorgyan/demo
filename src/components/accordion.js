import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Accordion as NativeBaseAccordion, Icon } from "native-base";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";

const renderHeader = (item, expanded) => {
  return (
    <View style={styles.accordionHeader}>
      <Text
        style={expanded ? styles.activeHeaderText : styles.inactiveHeaderText}
      >
        {item.title}
      </Text>
      <Icon name={expanded ? "chevron-up" : "chevron-down"} type="Feather" />
    </View>
  );
};

const renderContent = (item) => {
  return <View style={baseStylesheet.paddedContent}>{item.content}</View>;
};

const Accordion = ({ dataArray }) => {
  return (
    <NativeBaseAccordion
      renderHeader={renderHeader}
      dataArray={dataArray}
      renderContent={renderContent}
    />
  );
};

export default Accordion;

const styles = StyleSheet.create({
  accordionHeader: {
    flexDirection: "row",
    padding: "5%",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: colors.blueBorder,
  },
  activeHeaderText: {
    color: colors.secondaryButtonText,
    fontSize: 16,
    fontFamily: "montserrat-semi-bold",
    textTransform: "uppercase",
  },
  inactiveHeaderText: {
    color: colors.secondaryButtonText,
    fontSize: 16,
    fontFamily: "montserrat-regular",
    textTransform: "uppercase",
  },
});
