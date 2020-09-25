import * as Yup from "yup";
import i18n from "../i18n";

const requestInviteSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t("validator.email_invalid"))
    .required(i18n.t("validator.email_required")),
  linkedinProfile: Yup.string()
    .required(i18n.t("validator.linkedIn_url_required"))
    .matches(
      /^(http(s)?:\/\/)?([\w]+\.)?(linkedin|Linkedin)\.com\/(pub|in|profile)\/[A-Za-z0-9$-_.~]+\s*$/,
      i18n.t("validator.linkedIn_url_not_valid")
    ),
  angelListProfile: Yup.string().matches(
    /^(http(s)?:\/\/)?([\w]+\.)?(angel|Angel)\.co\/(p|u)\/[A-Za-z0-9$-_.~]+\s*$/,
    i18n.t("validator.angelList_url_not_valid")
  ),
});

export default requestInviteSchema;
