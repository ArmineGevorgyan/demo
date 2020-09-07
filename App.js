import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import i18n from "./src/i18n";
import { I18nextProvider } from "react-i18next";

export default function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <View style={styles.container}>
          <Text>Welcome to Draper Rhino!</Text>
          <StatusBar style="auto" />
        </View>
      </I18nextProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
