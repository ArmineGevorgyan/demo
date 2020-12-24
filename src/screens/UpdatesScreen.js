import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button, Content, Spinner, Icon } from "native-base";
import { withTranslation } from "react-i18next";
import { baseStylesheet } from "../styles/baseStylesheet";
import { colors } from "../styles/colors";
import { getUpdates } from "../redux/ducks/update";
// import UpdateItem from "../components/updateItem";
import { isEntrepreneur } from "../helpers/userTypeHelper";

class UpdatesScreen extends Component {
  componentDidMount() {
    if (!this.props.updateList) {
      this.props.getUpdates(this.props.startup.id);
    }
  }

  newUpdateButton() {
    const { t, navigation, startup } = this.props;

    return (
      <View style={styles.buttonView}>
        <Button
          style={baseStylesheet.whiteButton}
          // onPress={() =>
          //   navigation.navigate("NewUpdateScreen", {
          //     id: startup.id,
          //   })
          // }
        >
          <Icon style={styles.icon} name="plus" type="Feather" />
          <Text style={styles.buttonText}>
            {t("updatesScreen.newUpdateButton")}
          </Text>
        </Button>
      </View>
    );
  }

  entrepreneurSection() {
    const { t } = this.props;

    return (
      <Content style={baseStylesheet.baseContainer}>
        <Image
          style={styles.updateImage}
          source={require("../../assets/updates.png")}
        />
        <Text style={styles.newUpdate}>{t("updatesScreen.newUpdate")}</Text>
        {this.newUpdateButton()}
      </Content>
    );
  }

  investorSection() {
    const { t } = this.props;

    return (
      <Content style={baseStylesheet.baseContainer}>
        <Image
          style={styles.updateImage}
          source={require("../../assets/no-updates.png")}
        />
        <Text style={styles.newUpdate}>{t("updatesScreen.noUpdates")}</Text>
      </Content>
    );
  }

  render() {
    const { t, navigation, startup, isLoading, updateList, user } = this.props;

    if (isLoading || !updateList) {
      return <Spinner color={colors.lightBlue} />;
    }

    if (updateList.length <= 0) {
      return isEntrepreneur(user?.authorities[0])
        ? this.entrepreneurSection()
        : this.investorSection();
    }

    return (
      <Content style={baseStylesheet.baseContainer}>
        {isEntrepreneur(user?.authorities[0]) && this.newUpdateButton()}
        <View style={styles.list}>
          {/* {updateList
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) => (
              <UpdateItem
                item={item}
                startup={startup}
                navigation={navigation}
              />
            ))} */}
        </View>
      </Content>
    );
  }
}

const mapStateToProps = (state, props) => {
  const updateList = state.update.updateList;
  const isLoading = state.update.isLoading;
  const user = state.user.userData;

  return {
    updateList,
    isLoading,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUpdates: (data) => dispatch(getUpdates(data)),
  };
};

export default compose(
  withTranslation("translations"),
  connect(mapStateToProps, mapDispatchToProps)
)(UpdatesScreen);

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
  updateImage: {
    marginTop: 50,
    marginBottom: 25,
    height: 50,
    width: "100%",
    resizeMode: "contain",
  },
  newUpdate: {
    textAlign: "center",
    fontFamily: "montserrat-medium",
    fontSize: 14,
    marginLeft: 50,
    marginRight: 50,
  },
});
