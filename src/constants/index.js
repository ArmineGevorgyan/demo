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
    termsAndConditionsVideo: `${API_HOST}/investor/tc-video.mp4`,
    privacyPolicyVideo: `${API_HOST}/investor/pp-video.mp4`,
  },
  entrepreneur: {
    termsAndConditionsUri: `${API_HOST}/entrepreneur/tc.html`,
    privacyPolicyUri: `${API_HOST}/entrepreneur/pp.html`,
    termsAndConditionsVideo: `${API_HOST}/entrepreneur/tc-video.mp4`,
    privacyPolicyVideo: `${API_HOST}/entrepreneur/pp-video.mp4`,
  },
  notificationTypes: {
    ERROR: "error",
  },
  contactUsMessageMaxLength: 300,
};

export default constants;
