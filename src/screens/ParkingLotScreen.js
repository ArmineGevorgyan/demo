import { Container, Content } from "native-base";
import React, { Component } from "react";
import GrayHeader from "../components/grayHeader";

class ParkingLotScreen extends Component {

  backButtonHandler = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container>
        <GrayHeader
          title="Parking Lot"
          enableSearch
          backButtonHandler={this.backButtonHandler}
        />
        <Content>
          
        </Content>
      </Container>
    )
  }
};

export default ParkingLotScreen;
