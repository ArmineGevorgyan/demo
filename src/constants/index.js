import { Dimensions } from "react-native";

const constants = {
  blueHeaderHeight: (Dimensions.get("window").width * 204) / 375,
  blueHeaderContentHeight:
    Dimensions.get("window").height -
    (Dimensions.get("window").width * 204) / 375,
  emailStatus: {
    registered: "REGISTERED",
    accepted: "ACCEPTED",
    requested: "REQUESTED",
    rejected: "REJECTED",
    notFound: "NOT_FOUND",
  },
};

export default constants;
