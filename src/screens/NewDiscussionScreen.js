import React, { Component } from "react";
import { Content, Icon, Textarea } from "native-base";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";
import constants from "../constants";
import { baseStylesheet } from "../styles/baseStylesheet";
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
      <Content style={{ backgroundColor: "#FFF" }}>
        <View style={styles.container}>
          <View style={styles.textRowContainer}>
            <Icon
              style={{
                color: "#1179E6",
                marginTop:3,
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
                height:20,
                alignItems: "center",
              }}
            >
              <Text
                style={styles.postText}
              >
                {t("discussionsScreen.post")}
            </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Textarea
          rowSpan={35}
          maxLength={constants.discussionMaxLength}
          placeholder={t("discussionsScreen.inputPlaceholder")}
          placeholderTextColor={colors.blueBorder}
          style={styles.textarea}
          value={this.props.input}
          onChangeText={(e) => this.props.setInput(e)}
        />
      </Content>
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
    alignItems:"center",
    justifyContent: "center",
  },
  textRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    paddingLeft: 10,
    paddingRight: 10,
    color: colors.blackBlue,
    fontSize: 30,
    fontFamily: "montserrat-light",
    textAlign: "center",
  },
  textarea:{
    padding: 16,
    marginLeft: 10,
    marginRight: 10,
    flex:1,
    fontFamily: "montserrat-medium",
    backgroundColor:"#FFF",
  },
  postText:{
    color: "#1179E6",
    fontSize: 18,
    fontFamily:"montserrat-medium"
  }
});
