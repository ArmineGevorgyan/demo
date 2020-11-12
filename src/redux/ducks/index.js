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
import tcSlice from "./termsAndConditions";
import copyRightSlice from "./copyright";
import startupSlice from "./startup";
import pipelineSlice from "./pipeline";
import parkingLotSlice from "./parkingLot";
import userSlice from "./user";
import contactSlice from "./contact";
import entrepreneurProfileSlice from "./entrepreneurProfile";
import fileUploaderSlice from "./fileUploader";
import dropdowninputModalSlice from "./dropdownInputModal";
import timeZoneModalSlice from "./timeZoneModal";
import faqSlice from "./faq";
import resetPasswordSlice from "./resetPassword";
import legalSlice from "./legal";

const appReducer = combineReducers({
  requestInvite: requestInviteSlice,
  resendInvite: resendInviteSlice,
  termsAndConditions: tcSlice,
  authentication: authSlice,
  registration: registrationSlice,
  copyright: copyRightSlice,
  startup: startupSlice,
  pipeline: pipelineSlice,
  parkingLot: parkingLotSlice,
  user: userSlice,
  contactRequest: contactSlice,
  entrepreneurProfile: entrepreneurProfileSlice,
  fileUploader: fileUploaderSlice,
  dropdownInputModal: dropdowninputModalSlice,
  timeZoneModal: timeZoneModalSlice,
  faq: faqSlice,
  resetPassword: resetPasswordSlice,
  legal: legalSlice,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
