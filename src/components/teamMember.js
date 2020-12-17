import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../styles/colors";
import constants from '../constants';

const {
  windowWidth,
  teamTabHorizontalPadding,
  teamMembersPerRow,
  teamMembersWithMargin
} = constants;

const borderRightSize = Math.round((windowWidth-80*teamMembersPerRow-teamTabHorizontalPadding*2)/teamMembersWithMargin);

export const DividerLine = () => <View style={{ marginBottom: 15, borderTopColor: colors.blueBorder, borderTopWidth: 1 }} />;

const FounderCard = ({ imageSrc, name, position, isLastOnLine }) => (
  <View style={{ ...styles.founderCard, marginRight: isLastOnLine ? borderRightSize : 0 }}>
    <Image source={{ uri: imageSrc }} style={styles.founderImg} />
    <Text style={styles.founderName}>{name}</Text>
    <Text style={styles.founderPosition}>{position}</Text>
  </View>
);

const styles = StyleSheet.create({
  founderCard: {
    maxWidth: 80,
    flex: 1,
  },
  founderImg: {
    borderRadius: 6,
    width: "100%",
    height: 80
  },
  founderName: {
    fontSize: 12,
    color: colors.mainText,
    fontFamily: "montserrat-bold"
  },
  founderPosition: {
    fontSize: 12,
    color: colors.mainText,
    fontFamily: "montserrat-regular"
  }
});


export default FounderCard;