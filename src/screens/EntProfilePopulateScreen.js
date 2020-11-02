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
        <Content>

        </Content>
      </Container>
    )
  };
};

export default EntProfilePopulateScreen;