import * as React from "react";
import constants from "../constants";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function notificationNavigate(data) {
  const path = data.path.split("/");
  const types = constants.backendNotifiactionTypes;
  const currentRoute = navigationRef.current?.getCurrentRoute().name;
  let startupId = path[1];

  switch (data.type) {
    case types.STARTUP_DISCUSSIONS:
    case types.STARTUP_DISCUSSION_REPLY_CREATE:
      if (currentRoute == "StartupScreen") {
        this.goBack();
      }

      this.navigate("StartupScreen", {
        startupId,
        initialIndex: 4,
      });
      break;

    case types.STARTUP_UPDATE:
      if (currentRoute == "StartupScreen") {
        this.goBack();
      }

      this.navigate("StartupScreen", { startupId, initialIndex: 7 });
      break;
  }
}
