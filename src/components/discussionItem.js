import { connect } from "react-redux";
import { compose } from "redux";
import { View, Thumbnail, Card, Spinner, Icon } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { withTranslation } from "react-i18next";
import moment from "moment";
import constants from "../constants";
import { colors } from "../styles/colors";
import { addComment } from "../redux/ducks/discussion";
import DiscussionCommentItem from "./discussionCommentItem";

class DiscussionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCommentShow: false,
    };
  }

  getUserName() {
    const { item, currentUser, t } = this.props;
    const user = item.user;

    return currentUser?.id == user.id
      ? t("discussionsScreen.me")
      : `${user.firstName} ${user.lastName}`;
  }

  getTime(dateString) {
    const date = new Date(dateString).setHours(0, 0, 0, 0);
    const now = new Date().setHours(0, 0, 0, 0);
    const datetimeHours = new Date(dateString).getHours();
    const hours = new Date().getHours();

    if (date !== now) {
      return moment(dateString).format("ll");
    }

    if (hours - datetimeHours <= constants.showTimeFromNowHours) {
      return moment(dateString).fromNow();
    }

    return moment(dateString).format("LT");
  }

  addComment = (content) => {
    this.props.addComment({
      id: this.props.item.id,
      content: content,
      navigation: this.props.navigation,
    });
  };

  openReplyScreen = () => {
    this.props.navigation.navigate("NewDiscussionScreen", {
      type: constants.discussionNewReply,
      addComment: this.addComment,
    });
  };

  showComments = () => {
    if (this.props.item.discussionReplies.length) {
      this.setState({ isCommentShow: !this.state.isCommentShow });
    }
  };

  render() {
    const { t, item, currentUser } = this.props;
    const user = item.user;

    if (!item || !user) {
      return <Spinner color={colors.lightBlue} />;
    }

    return (
      <Card style={styles.itemContainer}>
        <View style={styles.row}>
          <View style={{ ...styles.row, width: "50%" }}>
            <Thumbnail
              style={styles.authorPhoto}
              small
              source={{ uri: user.investorProfile?.photoUrl }}
            />
            <View style={{ width: "100%" }}>
              <Text style={styles.authorName}>{this.getUserName()}</Text>
              <Text style={styles.authorPosition}>
                {user.investorProfile.position}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Icon
              style={styles.blueIcon}
              name="clockcircleo"
              type="AntDesign"
            />
            <Text style={styles.time}>{this.getTime(item.createdAt)}</Text>
            {currentUser?.id == user.id && (
              <TouchableOpacity>
                <Icon
                  style={styles.ellipsis}
                  name="ellipsis-v"
                  type="FontAwesome5"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{item.content}</Text>
        </View>
        <View style={[styles.repliesContainer, styles.row]}>
          <TouchableOpacity
            style={[styles.replies, styles.row]}
            onPress={this.showComments}
          >
            <Icon
              style={styles.blueIcon}
              name="message-text"
              type="MaterialCommunityIcons"
            />
            <Text style={styles.answers}>
              {item.discussionReplies.length ?? 0}
              {!this.state.isCommentShow &&
                " " + t("discussionsScreen.answers")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.reply, styles.row]}
            onPress={this.openReplyScreen}
          >
            <Icon style={styles.replyIcon} name="reply" type="Entypo" />
            <Text style={styles.replyText}>{t("discussionsScreen.reply")}</Text>
          </TouchableOpacity>
        </View>
        {this.state.isCommentShow && item.discussionReplies && (
          <View>
            {item.discussionReplies
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((comment) => (
                <DiscussionCommentItem
                  comment={comment}
                  getTime={this.getTime}
                />
              ))}
          </View>
        )}
      </Card>
    );
  }
}

const mapStateToProps = (state, props) => {
  const currentUser = state.user.userData;
  return { currentUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (comment) => dispatch(addComment(comment)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(DiscussionItem);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 12,
    backgroundColor: colors.offWhite,
    borderRadius: 6,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  authorName: {
    fontFamily: "montserrat-semi-bold",
    fontSize: 16,
  },
  authorPosition: {
    fontSize: 12,
    color: colors.blueBorder,
  },
  authorPhoto: {
    marginRight: 8,
  },
  content: {
    fontFamily: "montserrat-semi-bold",
    fontSize: 20,
  },
  contentContainer: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  repliesContainer: {
    borderTopColor: colors.blueBorder,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  replyIcon: {
    color: colors.lightBlue,
    fontSize: 16,
    marginLeft: 0,
    marginRight: 6,
  },
  blueIcon: {
    color: colors.blueBorder,
    fontSize: 16,
    marginLeft: 0,
    marginRight: 6,
  },
  replyText: {
    color: colors.lightBlue,
    fontFamily: "montserrat-semi-bold",
    fontSize: 12,
  },
  answers: {
    color: colors.deepGreen,
    fontSize: 12,
    fontFamily: "montserrat-regular",
  },
  time: {
    fontSize: 12,
    fontFamily: "montserrat-regular",
  },
  ellipsis: {
    color: colors.lightBlue,
    fontSize: 16,
    paddingLeft: 25,
    marginRight: 5,
  },
});
