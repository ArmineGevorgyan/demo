/**
 * We use 'Ducks' proposal for combining reducers,
 * actions, action creators and epics in one file
 *
 * For more information:
 * https://github.com/erikras/ducks-modular-redux
 */
import { combineReducers } from "redux";
import requestInviteSlice from "./requestInvite";

const appReducer = combineReducers({
  requestInvite: requestInviteSlice,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
