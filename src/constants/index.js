import { Dimensions } from "react-native";

const constants = {
  blueHeaderHeight: (Dimensions.get("window").width * 204) / 375,
  blueHeaderContentHeight:
    Dimensions.get("window").height -
    (Dimensions.get("window").width * 204) / 375,
};

export default constants;
