import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/colors";

class ContentField extends Component {
  render() {
    const { content, title, lineLimit, bottomBorder, children } = this.props;

    return (
      <View style={bottomBorder ? styles.bottomBorder : styles.container}>
        {!!title && <Text style={styles.title}>{title}</Text>}
        {!!content && <Text style={styles.content}>{content}</Text>}
        {children}
      </View>
    );
  }
}

export default ContentField;

const styles = StyleSheet.create({
  title: {
    color: colors.blackBlue,
    fontSize: 20,
    fontFamily: "montserrat-bold",
    marginBottom: 2,
  },
  content: {
    color: colors.blueText,
    fontSize: 14,
    fontFamily: "montserrat-regular",
  },
  container: {
    paddingBottom: 20,
  },
  bottomBorder: {
    borderBottomColor: colors.blueBorder,
    borderBottomWidth: 1,
    marginBottom: 14,
    paddingBottom: 14,
  },
});
