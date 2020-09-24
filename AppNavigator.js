import React, { Component } from "react";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RequestInviteScreen from "./src/screens/RequestInviteScreen";
import LandingScreen from "./src/screens/LandingScreen";
import { headerStyles } from "./src/styles/baseStylesheet";

class AppNavigator extends Component {
  render() {
    const Stack = createStackNavigator();
    const { t } = this.props;

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingScreen">
          <Stack.Screen
            options={{ headerShown: false }}
            name="LandingScreen"
            component={LandingScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
              // title: t("requestInviteScreen.headerText"),
              // ...headerStyles,
            }}
            name="RequestAnInvite"
            component={RequestInviteScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default compose(withTranslation("translations"))(AppNavigator);
