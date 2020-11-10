import * as Yup from "yup";
import i18n from "../i18n";

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email(i18n.t("validator.email_invalid"))
    .required(i18n.t("validator.email_required")),
});

export default emailSchema;
