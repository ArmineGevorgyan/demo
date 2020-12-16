import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import React, { useEffect } from "react";
import { YellowBox, Platform } from "react-native";
import { Root } from "native-base";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import store from "./src/redux/store";
import i18n from "./src/i18n";
import AppNavigator from "./AppNavigator";
import { setUserPushToken } from "./src/redux/ducks/user";
import * as Navigation from "./src/helpers/navigationHelper";
import * as Sentry from "sentry-expo";

YellowBox.ignoreWarnings([""]); // this will disable the yellow warning banners

Sentry.init({
  dsn:
    "https://a086c47001234067a40b7f2b08ce0782@o489477.ingest.sentry.io/5551769",
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      store.dispatch(setUserPushToken(token))
    );

    this.onResponseReceivedListener = Notifications.addListener(
      onResponseReceived
    );
  });

  const [isLoaded] = useFonts({
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-extra-bold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    "montserrat-light": require("./assets/fonts/Montserrat-Light.ttf"),
    "montserrat-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-semi-bold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "montserrat-extra-light": require("./assets/fonts/Montserrat-ExtraLight.ttf"),
  });

  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Root>
          <AppNavigator />
        </Root>
      </I18nextProvider>
    </Provider>
  );
}

onResponseReceived = async (response) => {
  const status = response.origin;

  if (status == "selected") {
    Navigation.notificationNavigate(response.data);
  }
};

registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notifications!");
      return;
    }

    token = await Notifications.getExpoPushTokenAsync();
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.createChannelAndroidAsync("default", {
      name: "default",
      sound: true,
      priority: "max",
      vibrate: [0, 250, 250, 250],
    });
  }

  return token;
};
