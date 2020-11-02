import { Container, Content } from "native-base";
import React, { Component } from "react";
import ProfileBlueHeader from "../components/profileBlueHeader";
import { removeToken } from "../helpers/auth";

class EntProfilePopulateScreen extends Component {

  backButtonHandler = () => {
this.props.navigation.goBack();
  };

  render() {
    return (
      <Container>
        <ProfileBlueHeader
          title="My Account"
          backButtonHandler={this.backButtonHandler}
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

      </Container>
    )
  };
};

export default EntProfilePopulateScreen;