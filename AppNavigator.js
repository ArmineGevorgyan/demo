import React, { Component } from "react";
import { Spinner } from "native-base";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Linking from "expo-linking";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RequestInviteScreen from "./src/screens/RequestInviteScreen";
import LandingScreen from "./src/screens/LandingScreen";
import RequestInviteSuccess from "./src/screens/RequestInviteSuccess";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import TermsAndConditionsScreen from "./src/screens/TermsAndConditionsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import DiscoverStartups from "./src/screens/DiscoverStartups";
import PipelineScreen from "./src/screens/PipelineScreen";
import { colors } from "./src/styles/colors";
import Explore from "./assets/explore.svg";
import Portfolio from "./assets/portfolio.svg";
import Star from "./assets/star.svg";
import Timeline from "./assets/timeline.svg";
import UserProfile from "./assets/user-profile.svg";
import ActivePortfolio from "./assets/portfolio-active.svg";
import ActiveStar from "./assets/star-active.svg";
import ActiveTimeline from "./assets/timeline-active.svg";
import ActiveUserProfile from "./assets/user-profile-active.svg";
import { authenticate } from "./src/redux/ducks/authentication";
import ProfileScreen from "./src/screens/ProfileScreen";
import TemporaryScreen from "./src/screens/TemporaryScreen";
import ParkingLotScreen from "./src/screens/ParkingLotScreen";

const prefix = Linking.makeUrl("/");

class AppNavigator extends Component {
  componentDidMount() {
    this.props.authenticate();
  }

  getScreenOptions(route) {
    return {
      tabBarIcon: ({ focused, color, size }) => {
        switch (route.name) {
          case "Discover":
            return (
              <Explore fill={focused ? colors.darkBlue : colors.darkText} />
            );
          case "Pipeline":
            return focused ? <ActiveStar /> : <Star />;
          case "Timeline":
            return focused ? <ActiveTimeline /> : <Timeline />;
          case "Portfolio":
            return focused ? <ActivePortfolio /> : <Portfolio />;
          case "Profile":
            return focused ? <ActiveUserProfile /> : <UserProfile />;
        }
      },
    };
  }

  render() {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const linking = {
      prefixes: [prefix],
    };

    const getStack = () => {
      const { isAuthenticated } = this.props;

      return isAuthenticated ? (
        <Stack.Navigator initialRouteName="Home" headerMode={false}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TemporaryScreen" component={TemporaryScreen} />
        </Stack.Navigator>
      ) : (
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
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
          <Stack.Screen
            name="TermsAndConditionsScreen"
            component={TermsAndConditionsScreen}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="ParkingLotScreen"
            component={ParkingLotScreen}
          />
        </Stack.Navigator>
      );
    };

    const Home = () => {
      return (
        <Tab.Navigator
          screenOptions={({ route }) => this.getScreenOptions(route)}
          tabBarOptions={{
            activeTintColor: colors.darkBlue,
            inactiveTintColor: "gray",
            style: styles.navigationTab,
          }}
        >
          <Tab.Screen name="Discover" component={DiscoverStartups} />
          <Tab.Screen name="Pipeline" component={PipelineScreen} />
          <Tab.Screen name="Timeline" component={LandingScreen} />
          <Tab.Screen name="Portfolio" component={TermsAndConditionsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      );
    };

    return (
      <NavigationContainer
        linking={linking}
        fallback={<Spinner color={colors.secondaryColor} />}
      >
        {getStack()}
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  navigationTab: {
    backgroundColor: colors.offWhite,
    paddingBottom: 5,
    paddingTop: 5,
  },
});

const mapStateToProps = (state, props) => {
  const isAuthenticated = state.authentication.isAuthenticated || false;

  return {
    isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => dispatch(authenticate()),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  AppNavigator
);
