/**
 * We use 'Ducks' proposal for combining reducers,
 * actions, action creators and epics in one file
 *
 * For more information:
 * https://github.com/erikras/ducks-modular-redux
 */
import { combineReducers } from "redux";
import requestInviteSlice from "./requestInvite";
import resendInviteSlice from "./resendInvite";
import authSlice from "./authentication";
import registrationSlice from "./registration";

const appReducer = combineReducers({
  requestInvite: requestInviteSlice,
  resendInvite: resendInviteSlice,
  authentication: authSlice,
  registration: registrationSlice,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
