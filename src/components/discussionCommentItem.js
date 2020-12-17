import React, { Component, } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
import { colors } from "../styles/colors";
import i18n from "../i18n";

class DiscussionCommentItem extends Component {

  render() {
    const { comment } = this.props;
    return (
      <View style={{ marginTop: 15, }}>
        <View style={styles.container}>
          <View style={styles.topRow}>
            <Icon
              style={styles.icon}
              name="message-text"
              type="MaterialCommunityIcons"
            />
            <Text style={styles.title}>
              {i18n.t("discussionsScreen.answeredBy")} {comment.user.firstName} {comment.user.lastName}
            </Text>
          </View>
          <Text style={{
            fontSize: 12,
          }}>
            {this.props.getTime(comment.createdAt)}
          </Text>
        </View>
        <Text style={styles.content}>
          {comment.content}
        </Text>
      </View>
    )
  };
};

export default DiscussionCommentItem;

const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topRow:{
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    color: colors.deepGreen,
    fontSize: 16,
    marginLeft: 0,
    marginRight: 6,
  },
  title: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: colors.deepGreen,
  },
  content: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: colors.darkText,
  },
});