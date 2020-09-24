/**
 * We use 'Ducks' proposal for combining reducers,
 * actions, action creators and epics in one file
 *
 * For more information:
 * https://github.com/erikras/ducks-modular-redux
 */
import { combineReducers } from "redux";
import requestInviteSlice from "./requestInvite";
import authSlice from "./authentication";

const appReducer = combineReducers({
  requestInvite: requestInviteSlice,
  authentication: authSlice,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
