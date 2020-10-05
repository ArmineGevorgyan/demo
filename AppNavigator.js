import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RequestInviteScreen from "./src/screens/RequestInviteScreen";
import LandingScreen from "./src/screens/LandingScreen";
import RequestInviteSuccess from "./src/screens/RequestInviteSuccess";

class AppNavigator extends Component {
  render() {
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingScreen" headerMode={false}>
          <Stack.Screen name="LandingScreen" component={LandingScreen} />
          <Stack.Screen
            name="RequestAnInvite"
            component={RequestInviteScreen}
          />
          <Stack.Screen
            name="RequestInviteSuccess"
            component={RequestInviteSuccess}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default AppNavigator;
