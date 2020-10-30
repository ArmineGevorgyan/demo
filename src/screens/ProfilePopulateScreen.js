import { Container, Content } from "native-base";
import React, { Component } from "react";
import ProfileBlueHeader from "../components/profileBlueHeader";

class ProfilePopulateScreen extends Component {

  backButtonHandler = () => {

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

export default ProfilePopulateScreen;