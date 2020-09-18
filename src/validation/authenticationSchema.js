import * as Yup from "yup";
import i18n from "../i18n";

const authenticationSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t("validator.email_invalid"))
    .required(i18n.t("validator.email_required")),
});

export default authenticationSchema;
