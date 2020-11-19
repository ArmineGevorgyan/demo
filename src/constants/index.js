import { Dimensions } from "react-native";
import { API_HOST } from "../config";

const constants = {
  blueHeaderHeight: (Dimensions.get("window").width * 204) / 375,
  blueHeaderContentHeight:
    Dimensions.get("window").height -
    (Dimensions.get("window").width * 204) / 375,
  windowHeight: Dimensions.get("window").height,
  windowWidth: Dimensions.get("window").width,
  widescreenVideoRatio: 16 / 9,
  widescreenVideoHeight: (Dimensions.get("window").width * 9) / 16,
  emailStatus: {
    registered: "REGISTERED",
    accepted: "ACCEPTED",
    requested: "REQUESTED",
    rejected: "REJECTED",
    notFound: "NOT_FOUND",
  },
  userRole: {
    investor: "ROLE_INVESTOR",
    entrepreneur: "ROLE_ENTREPRENEUR",
  },
  investor: {
    termsAndConditionsUri: `${API_HOST}/investor/tc.html`,
    privacyPolicyUri: `${API_HOST}/investor/pp.html`,
    svpContractUri: `${API_HOST}/investor/spv-contract.html`,
    termsAndConditionsVideo: `${API_HOST}/investor/tc-video.mp4`,
    privacyPolicyVideo: `${API_HOST}/investor/pp-video.mp4`,
    termsAndConditionsPDF: `${API_HOST}/investor/tc.pdf`,
    privacyPolicyPDF: `${API_HOST}/investor/pp.pdf`,
    svpContractPDF: `${API_HOST}/investor/spv-contract.pdf`,
  },
  entrepreneur: {
    termsAndConditionsUri: `${API_HOST}/entrepreneur/tc.html`,
    privacyPolicyUri: `${API_HOST}/entrepreneur/pp.html`,
    safeContractUri: `${API_HOST}/entrepreneur/safe-contract.html`,
    termsAndConditionsVideo: `${API_HOST}/entrepreneur/tc-video.mp4`,
    privacyPolicyVideo: `${API_HOST}/entrepreneur/pp-video.mp4`,
    termsAndConditionsPDF: `${API_HOST}/entrepreneur/tc.pdf`,
    privacyPolicyPDF: `${API_HOST}/entrepreneur/pp.pdf`,
    safeContractPDF: `${API_HOST}/entrepreneur/safe-contract.pdf`,
  },
  notificationTypes: {
    ERROR: "error",
    SUCCESS:"success",
  },
  contactUsMessageMaxLength: 300,
  shortBioMaxLength: 1000,
  highlightsMaxLength: 300,
  deleteAccountMessageMaxLength: 150,
  deleteAccountReasons: {
    service: "Poor Service",
    features: "Lack of features",
    tc: "Terms & Conditions",
    pp: "Privacy policy",
    other: "Other",
  },
};

export default constants;
