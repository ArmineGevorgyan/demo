import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Content, Icon } from "native-base";
import { withTranslation } from "react-i18next";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import DraperRhino from "../../assets/draper-rhino.svg";
import GrayHeader from "../components/grayHeader";
import getLegalItems from "../helpers/legalScreenHelper";

class LegalScreen extends Component {
  render() {
    const { t, userData, navigation } = this.props;

    return (
      <>
        <GrayHeader
          title={t("legalScreen.headerText")}
          backButtonHandler={() => navigation.goBack()}
        />
        <Content style={baseStylesheet.baseContainer}>
          <View style={styles.imageContainer}>
            <DraperRhino />
          </View>
          <View style={styles.itemContainer}>
            {userData &&
              getLegalItems(userData.authorities[0]).map((item) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("LegalDocumentScreen", { item })
                  }
                >
                  <View style={styles.itemRow}>
                    <View style={styles.icon}>{item.image}</View>
                    <View style={styles.content}>
                      <Text style={styles.title}>
                        {t(`legalScreen.${item.title}`)}
                      </Text>
                      <Text style={styles.description}>
                        {t(`legalScreen.${item.description}`)}
                      </Text>
                    </View>
                    <View style={styles.icon}>
                      <Icon name={"chevron-right"} type="Feather" />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </Content>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  const userData = state.user.userData;
  return {
    userData,
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, null)
)(LegalScreen);

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  itemContainer: {
    borderBottomColor: colors.blueBorder,
    borderBottomWidth: 1,
  },
  itemRow: {
    flexDirection: "row",
    width: "100%",
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopColor: colors.blueBorder,
    borderTopWidth: 1,
  },
  content: {
    paddingLeft: 20,
    paddingRight: 10,
    width: "80%",
  },
  title: {
    fontSize: 16,
    fontFamily: "montserrat-semi-bold",
    color: colors.blackBlue,
  },
  description: {
    fontSize: 10,
    fontFamily: "montserrat-regular",
    paddingTop: 2,
  },
  icon: {
    justifyContent: "center",
  },
});
