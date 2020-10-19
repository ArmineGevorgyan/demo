import { Toast } from "native-base";
import constants from "../constants";

export const showNotification = (type, message, duration = 3000) => {
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
    default:
      return "";
  }
};
