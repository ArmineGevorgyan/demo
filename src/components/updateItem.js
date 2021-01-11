import { connect } from "react-redux";
import { compose } from "redux";
import { View, Thumbnail, Card, Spinner, Icon } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { withTranslation } from "react-i18next";
import { getTime } from "../helpers/timeHelper";
import { colors } from "../styles/colors";
import { addComment } from "../redux/ducks/discussion";

class UpdateItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCommentShow: false,
    };
  }

  render() {
    const { t, item, startup, currentUser, navigation } = this.props;
    const user = startup.entrepreneur;

    if (!item || !user) {
      return <Spinner color={colors.lightBlue} />;
    }

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SingleUpdateScreen", { startup, item })
        }
      >
        <Card style={styles.itemContainer}>
          <View style={styles.row}>
            <View style={{ ...styles.row, width: "50%" }}>
              <Thumbnail
                style={styles.authorPhoto}
                small
                source={{ uri: user.photoUrl }}
              />
              <View style={{ width: "100%" }}>
                <Text
                  style={styles.authorName}
                >{`${user.firstName} ${user.lastName}`}</Text>
                <Text style={styles.authorPosition}>
                  {t("updatesScreen.entrepreneur")}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <Icon
                style={styles.blueIcon}
                name="clockcircleo"
                type="AntDesign"
              />
              <Text style={styles.time}>{getTime(item.createdAt)}</Text>
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
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content} numberOfLines={6}>
              {item.content}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
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
)(UpdateItem);

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
  title: {
    fontFamily: "montserrat-semi-bold",
    fontSize: 20,
    marginBottom: 5,
  },
  content: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: colors.darkText,
  },
  contentContainer: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  blueIcon: {
    color: colors.blueBorder,
    fontSize: 16,
    marginLeft: 0,
    marginRight: 6,
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
