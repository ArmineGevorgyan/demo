import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Accordion as NativeBaseAccordion, Icon } from "native-base";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import constants from "../constants";

const ListAccordion = ({ dataArray, hideNumber }) => {
  const renderHeader = (item, expanded) => {
    return (
      <View style={expanded ? styles.activeHeader : styles.inactiveHeader}>
        {!hideNumber && <View style={styles.listNumber}>
          <Text style={styles.number}>
            {dataArray.findIndex((e) => e.id === item.id) + 1}
          </Text>
        </View>}
        <Text style={styles.headerText}>{item.question}</Text>
        <Icon
          name={expanded ? "chevron-down" : "chevron-right"}
          type="Feather"
        />
      </View>
    );
  };

  const renderContent = (item) => {
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{item.answer}</Text>
      </View>
    );
  };

  return (
    <View style={styles.listContainer}>
      <NativeBaseAccordion
        renderHeader={renderHeader}
        dataArray={dataArray}
        renderContent={renderContent}
        style={styles.borderBottom}
      />
    </View>
  );
};

export default ListAccordion;

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: colors.blueBorder,
  },
  activeHeader: {
    flexDirection: "row",
    padding: "5%",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: colors.blueBorder,
    backgroundColor: colors.offWhite,
  },
  inactiveHeader: {
    flexDirection: "row",
    padding: "5%",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: colors.blueBorder,
  },
  listNumber: {
    width: 36,
    height: 36,
    borderColor: colors.lightBlue,
    borderWidth: 2,
    borderRadius: 18,
    justifyContent: "center",
    marginRight: 15,
  },
  number: {
    textAlign: "center",
    fontSize: 20,
  },
  headerText: {
    color: colors.blackBlue,
    fontSize: 16,
    width: constants.windowWidth - 120,
    fontFamily: "montserrat-semi-bold",
  },
  content: {
    backgroundColor: colors.offWhite,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentText: {
    color: colors.darkText,
    fontSize: 14,
    fontFamily: "montserrat-regular",
  },
  listContainer: {
    backgroundColor: "#FFF",
    ...baseStylesheet.elevation6,
  },
});
