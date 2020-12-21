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
  teamTabHorizontalPadding: 25,
  teamMembersPerRow: 3,
  teamMembersWithMargin: 2,
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
    SUCCESS: "success",
  },
  backendNotifiactionTypes: {
    STARTUP_DISCUSSIONS: "startup.discussion.create",
    STARTUP_DISCUSSION_REPLY_CREATE: "startup.discussion.reply.create",
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
  discussionNewReply: "REPLY",
  investorProfileBioMaxLength: 150,
  highlightsMaxLength: 300,
  discussionMaxLength: 1000,
  startupTabBarHeight: 48,
  startupHeaderHeight: 300,
  showTimeFromNowHours: 3,
  validURLRegExp: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
};

export default constants;
