import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { Container, Content, Icon, View } from "native-base";
import { compose } from "redux";
import { connect } from "react-redux";
import { colors } from "../styles/colors";
import { withTranslation } from "react-i18next";
import GrayHeader from "../components/grayHeader";
import { getSectionData } from "../helpers/profileScreenHelper";
import { getSectionBorderStyle } from "../helpers/profileScreenHelper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { baseStylesheet } from "../styles/baseStylesheet";
import { logout } from "../redux/ducks/authentication";
import { openDeleteAccountModal } from "../redux/ducks/deleteAccount";
import DeleteAccountModal from "../components/deleteAccountModal";
import constants from "../constants";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  navigateTo = (item) => {
    if (item.to) {
      this.props.navigation.navigate(item.to);
    } else {
      if (item.value === "logout") {
        return this.props.logout(this.props.navigation);
      }
      if (item.value === "deleteAccount") {
        return this.props.openDeleteAccountModal();
      }
    }
  };

  render() {
    const { t, userData } = this.props;

    return (
      <Container>
        <GrayHeader title={t("profileScreen.profile")} />
        {userData.authorities[0] == constants.userRole.investor && (
          <DeleteAccountModal />
        )}
        <Content>
          {userData &&
            getSectionData(userData.authorities[0]).map((section, index) => (
              <View
                style={[
                  styles.section,

                  baseStylesheet.elevation6,
                  {
                    marginTop: index === 0 ? 20 : 10,
                    marginBottom:
                      index ===
                      getSectionData(userData.authorities[0]).length - 1
                        ? 20
                        : 10,
                  },
                ]}
              >
                {section.map((item, index) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.navigateTo(item)}
                  >
                    <View
                      style={[
                        styles.sectionListItemStyle,
                        getSectionBorderStyle(index, section.length - 1),
                      ]}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={[
                            styles.iconContainer,
                            { backgroundColor: item.backgroundColor },
                          ]}
                        >
                          {item.icon ? (
                            <Icon
                              name={item.icon}
                              type={item.iconType}
                              style={styles.icon}
                            />
                          ) : (
                            item.svg
                          )}
                        </View>
                        <Text
                          style={[
                            { fontSize: 18 },
                            item.id === 11 && { color: "#D60000" },
                          ]}
                        >
                          {t(`profileScreen.${item.value}`)}
                        </Text>
                      </View>
                      {item.to && (
                        <Icon
                          name="chevron-right"
                          type="MaterialCommunityIcons"
                        />
                      )}
                    </View>
                    {index !== section.length - 1 && (
                      <View style={styles.itemSeparator} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  const userData = state.user.userData;
  return {
    userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (navigation) => dispatch(logout(navigation)),
    openDeleteAccountModal: () => dispatch(openDeleteAccountModal()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileScreen);

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.offWhite,
    height: 59,
    marginBottom: 1,
  },
  headerTitle: {
    color: colors.blackBlue,
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "montserrat-regular",
  },
  section: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
  },
  sectionListItemStyle: {
    flexDirection: "row",
    padding: 14,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  itemSeparator: {
    alignSelf: "center",
    width: "100%",
    borderRightColor: "white",
    borderLeftColor: "white",
    backgroundColor: colors.blueBorder,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    height: 1,
  },
  iconContainer: {
    width: 33,
    height: 33,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 17,
  },
  icon: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
