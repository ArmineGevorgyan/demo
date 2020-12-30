import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Content, Thumbnail, Icon } from "native-base";
import { withTranslation } from "react-i18next";
import { baseStylesheet } from "../styles/baseStylesheet";
import GrayHeader from "../components/grayHeader";
import { colors } from "../styles/colors";
import { getTime } from "../helpers/timeHelper";

class SingleUpdateScreen extends Component {
  render() {
    const { t, navigation, currentUser } = this.props;
    const { startup, item } = this.props.route.params;
    const user = startup.entrepreneur;

    return (
      <>
        <GrayHeader
          title={t(`updatesScreen.update`)}
          backButtonHandler={() => navigation.goBack()}
        />
        <Content
          style={[baseStylesheet.paddedContent, baseStylesheet.baseContainer]}
        >
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
            <Text style={styles.content}>{item.content}</Text>
          </View>
        </Content>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const currentUser = state.user.userData;
  return { currentUser };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, null)
)(SingleUpdateScreen);

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
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
