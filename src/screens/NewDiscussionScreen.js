import React, { Component } from "react";
import { Container, Content, Icon, Textarea } from "native-base";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";
import constants from "../constants";
import { createDiscussion, setInput, } from "../redux/ducks/discussion";

class NewDiscussionScreen extends Component {

  createDiscussion = () => {
    this.props.createDiscussion({
      startup: { id: this.props.route.params.id, },
      content: this.props.input,
    }, this.props.navigation);
  };

  render() {
    const { t } = this.props;
    return (
      <Container>
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.textRowContainer}>
              <Icon
                style={{
                  color: colors.backIconBlue,
                  marginTop: 3,
                }}
                name="arrow-left"
                type="Feather"
                onPress={this.props.navigation.goBack}
              />
              <Text style={styles.headerText}>
                {t("discussionsScreen.newDiscussion")}
              </Text>
              <TouchableOpacity
                onPress={this.createDiscussion}
                style={{
                  height: 20,
                  alignItems: "center",
                }}
              >
                <Text style={styles.postText}>
                  {t("discussionsScreen.post")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Content enableAutomaticScroll={false}>
            <Textarea
              rowSpan={20}
              maxLength={constants.discussionMaxLength}
              placeholder={t("discussionsScreen.inputPlaceholder")}
              placeholderTextColor={colors.blueBorder}
              style={styles.textarea}
              value={this.props.input}
              onChangeText={(e) => this.props.setInput(e)}
            />
          </Content>

        </View>
      </Container>
    )
  };
};

const mapStateToProps = (state, props) => {
  const input = state.discussion.input;
  const isLoading = state.discussion.isLoading;
  return {
    input,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInput: (data) => dispatch(setInput(data)),
    createDiscussion: (data, navigation) => dispatch(createDiscussion(data, navigation)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(NewDiscussionScreen)

const styles = StyleSheet.create({
  container: {
    paddingLeft: "3%",
    paddingRight: "3%",
    backgroundColor: colors.offWhite,
    borderBottomColor: colors.blueBorder,
    borderBottomWidth: 1,
    paddingTop: 25,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  textRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    paddingLeft: 15,
    paddingRight: 15,
    color: colors.blackBlue,
    fontSize: 30,
    fontFamily: "montserrat-light",
    textAlign: "center",
  },
  textarea: {
    padding:16,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    fontFamily: "montserrat-medium",
    backgroundColor: "#FFF",
  },
  postText: {
    color: colors.backIconBlue,
    fontSize: 18,
    fontFamily: "montserrat-medium"
  }
});
