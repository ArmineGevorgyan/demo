import moment from "moment";

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

  return moment(dateString).format("LT");
};
