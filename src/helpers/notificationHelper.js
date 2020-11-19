import { Toast } from "native-base";
import constants from "../constants";
import i18n from "../i18n";
import { colors } from "../styles/colors";

export const showNotification = (type, message, duration = 3000) => {
  message = i18n.t(message);

  switch (type) {
    case constants.notificationTypes.ERROR: {
      return Toast.show({
        text: message,
        type: "danger",
        position: "top",
        duration: duration,
        style: {
          backgroundColor: "#C74545",
          shadowColor: "#FF9696DB",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3.84,
          elevation: 5,
        },
        textStyle: {
          textAlign: "center",
          fontFamily: "montserrat-regular",
        },
      });
    }
    case constants.notificationTypes.SUCCESS: {
      return Toast.show({
        text: message,
        type: "success",
        position: "top",
        duration: duration,
        style: {
          backgroundColor: colors.deepGreen,
          shadowColor: "#FF9696DB",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3.84,
          elevation: 5,
        },
        textStyle: {
          textAlign: "center",
          fontFamily: "montserrat-regular",
        },
      });
    }
    default:
      return "";
  }
};
