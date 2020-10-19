import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import store from "../redux/store";
import { clearAuthentication } from "../redux/ducks/authentication";
import { showNotification } from "./notificationHelper";
import i18n from "../i18n";

export const setToken = async (token) => {
  try {
    axios.interceptors.request.use(
      (config) => {
        const header = { Authorization: `Bearer ${token}` };
        Object.assign(config.headers, header);

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    await AsyncStorage.setItem("@token", token);
  } catch (e) {}
};

export const getToken = () => AsyncStorage.getItem("@token");

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("@token");
  } catch (e) {}
};

getToken().then((token) => {
  if (token) {
    axios.interceptors.request.use(
      (config) => {
        const header = { Authorization: `Bearer ${token}` };
        Object.assign(config.headers, header);

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config && error.response && error.response.status === 401) {
      removeToken()
        .then(() => {
          store.dispatch(clearAuthentication());
        })
        .then(() => {
          showNotification("error", i18n.t("notification.expiredToken"));
        });
    }

    return Promise.reject(error);
  }
);
