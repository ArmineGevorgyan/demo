import * as Yup from "yup";
import constants from "../constants";
import i18n from "../i18n";

const deleteAccountSchema = Yup.object().shape({
  profileDeleteRequestReason: Yup.object().required(
    i18n.t("validator.reason_required")
  ),
  message: Yup.string()
    .trim()
    .when("reason", {
      is: (reason) => reason?.name == constants.deleteAccountReasons.other,
      then: Yup.string().required(i18n.t("validator.message_required")),
    }),
});

export default deleteAccountSchema;
