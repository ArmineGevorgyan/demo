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
import { navigationRef } from "./src/helpers/navigationHelper";
import ProfileScreen from "./src/screens/ProfileScreen";
import TemporaryScreen from "./src/screens/TemporaryScreen";
import ParkingLotScreen from "./src/screens/ParkingLotScreen";
import ContactUsScreen from "./src/screens/ContactUsScreen";
import ContactUsSuccess from "./src/screens/ContactUsSuccess";
import EntProfilePopulateScreen from "./src/screens/EntProfilePopulateScreen";
import InvestorProfileEditScreen from "./src/screens/InvestorProfileEditScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import FAQScreen from "./src/screens/FAQScreen";
import ResetPasswordSuccess from "./src/screens/ResetPasswordSuccess";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import LegalScreen from "./src/screens/LegalScreen";
import LegalDocumentScreen from "./src/screens/LegalDocumentScreen";
import InvestorProfileScreen from "./src/screens/InvestorProfileScreen";
import EntProfileEditScreen from "./src/screens/EntProfileEditScreen";
import StartupScreen from "./src/screens/StartupScreen";
import DiscussionsScreen from "./src/screens/DiscussionsScreen";
import TeamScreen from "./src/screens/TeamScreen";
import ProductScreen from "./src/screens/ProductScreen";
import CompanyScreen from "./src/screens/CompanyScreen";
import NewDiscussionScreen from "./src/screens/NewDiscussionScreen";
import OverviewScreen from "./src/screens/OverviewScreen";
import Notifications from "./src/screens/NotificationsScreen";
import { isEntrepreneur } from "./src/helpers/userTypeHelper";
import CEOProfileScreen from "./src/screens/CEOProfileScreen";
import StartupPopulateScreen from "./src/screens/StartupPopulateScreen";

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
    const { isAuthenticated, completed, user } = this.props;

    const getStack = () => {
      const { isAuthenticated, completed, user } = this.props;

      if (!isAuthenticated) {
        return (
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
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="ResetPasswordSuccess"
              component={ResetPasswordSuccess}
            />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </Stack.Navigator>
        );
      }

      if (isEntrepreneur(user?.authorities[0]) && !completed) {
        return (
          <Stack.Navigator
            initialRouteName="EntProfilePopulateScreen"
            headerMode={false}
          >
            <Stack.Screen
              name="EntProfilePopulateScreen"
              component={EntProfilePopulateScreen}
            />
          </Stack.Navigator>
        );
      }

      if (isEntrepreneur(user?.authorities[0]) && completed) {
        return (
          <Stack.Navigator
            initialRouteName="StartupPopulateScreen"
            headerMode={false}
          >
            <Stack.Screen
              name="StartupPopulateScreen"
              component={StartupPopulateScreen}
            />
          </Stack.Navigator>
        );
      }

      return (
        <Stack.Navigator initialRouteName="Home" headerMode={false}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TemporaryScreen" component={TemporaryScreen} />
          <Stack.Screen name="ParkingLotScreen" component={ParkingLotScreen} />
          <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
          <Stack.Screen name="ContactUsSuccess" component={ContactUsSuccess} />
          <Stack.Screen name="FAQScreen" component={FAQScreen} />
          <Stack.Screen name="LegalScreen" component={LegalScreen} />
          <Stack.Screen name="TeamScreen" component={TeamScreen} />
          <Stack.Screen
            name="DiscussionsScreen"
            component={DiscussionsScreen}
          />
          <Stack.Screen name="ProductScreen" component={ProductScreen} />
          <Stack.Screen name="CompanyScreen" component={CompanyScreen} />
          <Stack.Screen
            name="NewDiscussionScreen"
            component={NewDiscussionScreen}
          />
          <Stack.Screen
            name="EntProfileEditScreen"
            component={EntProfileEditScreen}
          />
          <Stack.Screen
            name="LegalDocumentScreen"
            component={LegalDocumentScreen}
          />
          <Stack.Screen name="StartupScreen" component={StartupScreen} />
          <Stack.Screen
            name="InvestorProfileEditScreen"
            component={InvestorProfileEditScreen}
          />
          <Stack.Screen
            name="InvestorProfileScreen"
            component={InvestorProfileScreen}
          />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="ResetPasswordSuccess"
            component={ResetPasswordSuccess}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="NotificationsScreen" component={Notifications} />
          <Stack.Screen name="CEOProfileScreen" component={CEOProfileScreen} />
          <Stack.Screen name="OverviewScreen" component={OverviewScreen} />
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
        ref={navigationRef}
        fallback={<Spinner color={colors.secondaryColor} />}
      >
        {isAuthenticated && !user ? (
          <Spinner color={colors.secondaryColor} />
        ) : (
          getStack()
        )}
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
  const completed = state.entrepreneurProfile.profileData?.completed;
  const user = state.user.userData;

  return {
    isAuthenticated,
    completed,
    user,
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
