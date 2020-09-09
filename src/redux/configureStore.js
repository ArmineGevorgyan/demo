import {
  configureStore as toolkitConfigureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { rootReducer } from "./ducks";

export const configureStore = () => {
  const preloadedState = {};
  const loggerMiddleware = createLogger();

  const store = toolkitConfigureStore({
    reducer: rootReducer,
    middleware: [
      loggerMiddleware,
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
    ], // redux-thunk is added by default
    preloadedState, //initialState
  });

  return store;
};
