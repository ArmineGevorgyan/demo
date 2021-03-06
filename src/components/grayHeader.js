import React, { Component } from "react";
import { Icon } from "native-base";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { withTranslation } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";

import constants from "../constants";
import { getUnreadNotificationCount } from "../redux/ducks/notifications";
import { handleFieldSave } from "../redux/ducks/startup";
import { colors } from "../styles/colors";

const { windowWidth } = constants;

const BellIcon = ({ hasUnread }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate("NotificationsScreen")}
    >
      <View style={styles.bellIconContainer}>
        <Icon type="Feather" name="bell" style={styles.bellIcon} />
        {hasUnread && (
          <View style={styles.redDotContainer}>
            <Icon
              name="primitive-dot"
              type="Octicons"
              style={styles.bellRedDot}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

class GrayHeader extends Component {
  componentDidMount() {
    this.props.getUnreadNotificationCount();
  }

  render() {
    const {
      title,
      children,
      enableSearch,
      enableBell,
      backButtonHandler,
      unreadNotificationCount,
      t,
      editingField,
      startupId,
      handleFieldSave
    } = this.props;

    return (
      <View
        style={[
          styles.container,
          children ? styles.withCildren : styles.withoutChildren,
        ]}
      >
        <View style={styles.textRowContainer}>
          <View style={{ minWidth: 30 }}>
            {backButtonHandler && (
              <Icon
                style={{
                  color: colors.backIconBlue,
                }}
                name="arrow-left"
                type="Feather"
                onPress={backButtonHandler}
              />
            )}
          </View>
          <Text style={[styles.headerText, children && { marginBottom: 15 }]}>
            {title}
          </Text>
          <View
            style={{
              minWidth: 30,
              flexDirection: "row",
              marginBottom: !enableSearch ? 15 : 0
            }}
          >
            {editingField && (
              <TouchableOpacity onPress={() => {
                handleFieldSave(editingField, startupId);
                backButtonHandler();
              }}>
                <Text style={styles.saveText}>
                  {t("editScreen.save")}
                </Text>
              </TouchableOpacity>
            )}
            {enableBell && <BellIcon hasUnread={!!unreadNotificationCount} />}
            {enableSearch && (
              <Icon
                style={{
                  color: colors.darkText,
                }}
                name="search"
                type="Feather"
              />
            )}
          </View>
        </View>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: windowWidth < 370 ? "2%" : "7%",
    paddingRight: windowWidth < 370 ? "4%" : "7%",
    backgroundColor: colors.offWhite,
    borderBottomColor: colors.blueBorder,
    borderBottomWidth: 1,
  },
  withCildren: {
    paddingTop: 50,
  },
  withoutChildren: {
    paddingTop: 25,
    height: 100,
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
    fontSize: windowWidth < 370 ? 24 : 30,
    fontFamily: "montserrat-light",
    textAlign: "center",
  },
  bellIconContainer: {
    marginRight: 10,
    maxHeight: 28,
  },
  bellIcon: {
    color: colors.darkText,
    width: "100%",
    height: "100%",
  },
  redDotContainer: {
    position: "relative",
    top: -30,
    right: windowWidth < 370 ? -14 : -12,
    width: 15,
    height: 15,
    backgroundColor: colors.offWhite,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  bellRedDot: {
    color: colors.lightRed,
    fontSize: 20,
    position: "absolute",
    top: -3,
  },
  saveText: {
    color: colors.secondaryButtonText,
    fontSize: 18,
    fontFamily: "montserrat-medium",
    marginTop: 15
  }
});

const mapStateToProps = (state, props) => {
  const { unreadNotificationCount } = state.notifications;

  return {
    unreadNotificationCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUnreadNotificationCount: () => dispatch(getUnreadNotificationCount()),
    handleFieldSave: (editingField, startupId) => dispatch(handleFieldSave(editingField, startupId))
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(GrayHeader);
