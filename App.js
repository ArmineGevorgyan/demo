import React from "react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import store from "./src/redux/store";
import i18n from "./src/i18n";
import AppNavigator from "./AppNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AppNavigator />
      </I18nextProvider>
    </Provider>
  );
}
