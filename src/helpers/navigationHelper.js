import * as React from "react";
import constants from "../constants";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function notificationNavigate(data) {
  const path = data.path.split("/");
  const types = constants.backendNotifiactionTypes;

  if (data.type == types.STARTUP_DISCUSSIONS ||
    data.type == types.STARTUP_DISCUSSION_REPLY_CREATE
  ) {
    let startupId = path[1];
    this.navigate("StartupScreen", { startupId, initialIndex: 4 });
  }
}
