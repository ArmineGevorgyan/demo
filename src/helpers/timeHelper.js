import moment from "moment";
import i18n from "../i18n";
import constants from "../constants";

export const getTime = (dateString) => {
  const date = new Date(dateString).setHours(0, 0, 0, 0);
  const now = new Date().setHours(0, 0, 0, 0);
  const datetimeHours = new Date(dateString).getHours();
  const hours = new Date().getHours();

  if (date !== now) {
    return moment(dateString).format("ll");
  }

  if (hours - datetimeHours <= constants.showTimeFromNowHours) {
    return moment(dateString).fromNow();
  }

  if (moment(dateString).isSame(moment().subtract(1, "day"), "day")) {
    return i18n.t("notificationsScreen.yesterday");
  }

  return moment(dateString).format("LT");
};
