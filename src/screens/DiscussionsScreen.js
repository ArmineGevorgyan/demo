import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View } from "react-native";
import { Button, Content, Spinner, Icon } from "native-base";
import { withTranslation } from "react-i18next";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import { getDiscussions } from "../redux/ducks/discussion";
import DiscussionItem from "../components/discussionItem";
import constants from "../constants";

class DiscussionsScreen extends Component {
  componentDidMount() {
    this.props.getDiscussions(this.props.startup.id);
  }

  render() {
    const {
      t,
      navigation,
      startup,
      isLoading,
      discussionList,
      user,
    } = this.props;

    if (isLoading || !discussionList) {
      return <Spinner color={colors.lightBlue} />;
    }

    return (
      <Content style={baseStylesheet.baseContainer}>
        {user?.authorities[0] == constants.userRole.investor && (
          <View style={styles.buttonView}>
            <Button
              style={baseStylesheet.whiteButton}
              onPress={() =>
                navigation.navigate("NewDiscussionScreen", {
                  id: startup.id,
                })
              }
            >
              <Icon style={styles.icon} name="plus" type="Feather" />
              <Text style={styles.buttonText}>
                {t("discussionsScreen.createNewButton")}
              </Text>
            </Button>
          </View>
        )}
        <View style={styles.list}>
          {discussionList
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) => (
              <DiscussionItem item={item} startup={startup} />
            ))}
        </View>
      </Content>
    );
  }
}

const mapStateToProps = (state, props) => {
  const discussionList = state.discussion.discussionList;
  const isLoading = state.discussion.isLoading;
  const user = state.user.userData;

  return {
    discussionList,
    isLoading,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createDiscussion: (data) => dispatch(createDiscussion(data)),
    getDiscussions: (data) => dispatch(getDiscussions(data)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(DiscussionsScreen);

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25,
  },
  buttonText: {
    color: colors.lightBlue,
    fontSize: 18,
    fontFamily: "montserrat-regular",
  },
  icon: {
    color: colors.lightBlue,
    fontSize: 18,
    marginLeft: 0,
    marginRight: 10,
  },
  list: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 5,
  },
});
