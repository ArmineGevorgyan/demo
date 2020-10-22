import React, { Component } from "react";
import {
  Body,
  Container,
  Content,
  Header,
  Title,
  View,
} from "native-base";
import { Text, } from "react-native";

class TemporaryScreen extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Text
              style={{
                textAlign: "center",
              }}
            >
              Temporary Screen
            </Text>
          </Body>
        </Header>
        <Content>
          <View>
            <Text>
              Temporary View
          </Text>
          </View>
        </Content>
      </Container>
    )
  }
}

export default TemporaryScreen