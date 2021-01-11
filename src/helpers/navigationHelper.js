import * as React from "react";
import constants from "../constants";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function notificationNavigate(data) {
  const path = data.path.split("/");
  const types = constants.backendNotifiactionTypes;
  let startupId = path[1];

  switch (data.type) {
    case types.STARTUP_DISCUSSIONS:
    case types.STARTUP_DISCUSSION_REPLY_CREATE:
      this.navigate("StartupScreen", { startupId, initialIndex: 4 });
      break;

    case types.STARTUP_UPDATE:
      this.navigate("StartupScreen", { startupId, initialIndex: 7 });
      break;
  }
}
