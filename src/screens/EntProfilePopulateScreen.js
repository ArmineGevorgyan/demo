import { Container, Content, Icon } from "native-base";
import React, { Component } from "react";
import ProfileBlueHeader from "../components/profileBlueHeader";
import { Button } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { compose } from "redux";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { colors } from "../styles/colors";
import { baseStylesheet } from "../styles/baseStylesheet";
import { save } from "../redux/ducks/entrepreneurProfile";

class EntProfilePopulateScreen extends Component {

  handleNext = () => {
    const { save } = this.props;
    save();
  };

  handleReset = () => {

  };

  render() {
    const { t, } = this.props;

    return (
      <Container>
        <ProfileBlueHeader
          title="My Account"
        />
        <Content style={{
          ...baseStylesheet.paddedContent,
          backgroundColor:colors.offWhite,
        }}>
          <View>
            <Button
              onPress={() => this.handleNext()}
              style={baseStylesheet.mainButton}
            >
              <Text style={baseStylesheet.mainButtonText}>
                {t("entProfilePopulateScreen.nextButton")}
              </Text>
              <Icon
                name="arrow-right"
                type="Feather"
                style={styles.rightIcon}
              />
            </Button>

            <Button
              style={{
                ...baseStylesheet.grayButton,
                backgroundColor: colors.offWhite,
              }}
              onPress={() => this.handleReset()}
            >
              <Text style={baseStylesheet.grayButtonText}>
                {t("entProfilePopulateScreen.resetButton")}
              </Text>
            </Button>
          </View>
        </Content>
      </Container >
    )
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: () => dispatch(save()),
  };
};

export default compose(
  withTranslation("translations"),
  connect(null, mapDispatchToProps)
)(EntProfilePopulateScreen);

const styles = StyleSheet.create({
  rightIcon: {
    position: "absolute",
    left: "60%",
  },
});