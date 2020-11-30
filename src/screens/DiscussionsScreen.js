import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, View } from "react-native";
import { Button, Content, Spinner, Icon } from "native-base";
import { withTranslation } from "react-i18next";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import { getDiscussions } from "../redux/ducks/discussion";

class DiscussionsScreen extends Component {
  componentDidMount() {
    this.props.getDiscussions();
  }

  render() {
    const { t, navigation, isLoading, discussionList } = this.props;

    if (isLoading || !discussionList) {
      return <Spinner color={colors.lightBlue} />;
    }

    return (
      <Content style={baseStylesheet.baseContainer}>
        <View style={styles.buttonView}>
          <Button
            style={baseStylesheet.whiteButton}
            // onPress={navigation.navigate('CreateDiscussionScreen')}
          >
            <Icon style={styles.icon} name="plus" type="Feather" />
            <Text style={styles.buttonText}>
              {t("discussionsScreen.createNewButton")}
            </Text>
          </Button>
        </View>
      </Content>
    );
  }
}

const mapStateToProps = (state, props) => {
  const discussionList = state.discussion.discussionList;
  const isLoading = state.discussion.isLoading;
  return {
    discussionList,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
    marginBottom: 15,
    marginLeft: 30,
    marginRight: 30,
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
});
