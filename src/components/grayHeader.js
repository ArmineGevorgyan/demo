import React, { Component } from "react";
import { Icon } from "native-base";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { withTranslation } from "react-i18next";
import { compose } from "redux";
import { connect } from 'react-redux';

import constants from '../constants';
import { getUnreadNotificationCount } from  "../redux/ducks/notifications";
import { colors } from "../styles/colors";

const { windowWidth } = constants;

const BellIcon = ({ hasUnread, hasBottomMargin }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate("NotificationsScreen")}
    >
      <View style={{ ...styles.bellIconContainer, marginBottom: hasBottomMargin ? 10 : 0 }}>
        <Icon
          type="Feather"
          name="bell"
          style={styles.bellIcon}
        />
        {hasUnread && <Text
          style={styles.bellRedDot}
        >
          {'\u2B24'}
        </Text>}
      </View>
    </TouchableOpacity>
  );
}

class GrayHeader extends Component {

  componentDidMount(){
    this.props.getUnreadNotificationCount();
  }

  render() {
    const { title, children, enableSearch, enableBell, backButtonHandler, unreadNotificationCount } = this.props;

    return (
      <View
        style={[
          styles.container,
          children ? styles.withCildren : styles.withoutChildren,
        ]}
      >
        <View style={styles.textRowContainer}>
          {backButtonHandler && (
            <View style={{ minWidth: 30 }}>
                <Icon
                  style={{
                    color: colors.backIconBlue,
                  }}
                  name="arrow-left"
                  type="Feather"
                  onPress={backButtonHandler}
                />
            </View>
          )}
          <Text style={[styles.headerText, children && { marginBottom: 15 }]}>
            {title}
          </Text>
          {enableBell && <BellIcon hasUnread={!!unreadNotificationCount} hasBottomMargin={!enableSearch} />}
          <View
            style={{
              minWidth: 30,
              flexDirection: "row",
              marginBottom: !enableSearch ? 15 : 0
            }}
          >
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
    paddingLeft: windowWidth < 355 ? "5%" : "7%",
    paddingRight: windowWidth < 355 ? "5" : "7%",
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
    fontSize: 30,
    fontFamily: "montserrat-light",
    textAlign: "center",
  },
  bellIconContainer: {
    marginLeft: windowWidth < 355 ? 0 : 10,
    maxHeight: 28,
  },
  bellIcon: {
    color: colors.darkText,
    width: "100%",
    height: "100%",
  },
  bellRedDot: {
    position: "absolute",
    top: 0,
    right: 0,
    color: colors.lightRed,
    alignItems: 'center',
    borderColor: colors.offWhite,
    borderWidth: 3,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    lineHeight: 14,
    width: 11,
    height: 12
  },
});

const mapStateToProps = (state, props) => {
  const { unreadNotificationCount } = state.notifications;

  return {
    unreadNotificationCount
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUnreadNotificationCount: () => dispatch(getUnreadNotificationCount())
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(GrayHeader);