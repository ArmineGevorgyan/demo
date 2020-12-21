import * as React from "react";
import store from "../redux/store";
import { getStartupById } from "../redux/ducks/startup";
import constants from "../constants";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function notificationNavigate(data) {
  const path = data.path.split("/");
  const state = store.getState();
  const types = constants.backendNotifiactionTypes;

  if (data.type == types.STARTUP_DISCUSSIONS ||
    data.type == types.STARTUP_DISCUSSION_REPLY_CREATE
  ) {
    let startupId = path[1];
    store.dispatch(getStartupById(startupId));

    const prevStartup = state.startup.singleStartup;
    const unsubscribe = store.subscribe(() => {
      let startup = store.getState().startup.singleStartup;

      if (prevStartup == null && startup) {
        this.navigate("StartupScreen", { startup, initialIndex: 4 });
        unsubscribe();
      }
    });
  }
}
