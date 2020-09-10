/**
 * We use 'Ducks' proposal for combining reducers,
 * actions, action creators and epics in one file
 *
 * For more information:
 * https://github.com/erikras/ducks-modular-redux
 */
import { combineReducers } from "redux";

const appReducer = combineReducers({});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
