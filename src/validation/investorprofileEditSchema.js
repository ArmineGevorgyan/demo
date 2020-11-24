import * as Yup from "yup";
import i18n from "../i18n";
import constants from "../constants";

const investorprofileEditSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .required(i18n.t("validator.fullName_required")),
  position: Yup.string()
    .trim()
    .required(i18n.t("validator.position_required")),
  companyName: Yup.string()
    .trim()
    .required(i18n.t("validator.companyName_required")),
  bio: Yup.string().
    trim().
    required(i18n.t("validator.bio_required")),
  linkedinProfile: Yup.string()
    .trim()
    .required(i18n.t("validator.linkedIn_url_required"))
    .matches(constants.validURLRegExp, i18n.t("validator.linkedIn_url_not_valid")),
  crunchbaseProfile: Yup.string()
    .trim()
    .matches(constants.validURLRegExp, i18n.t("validator.crunchbase_url_not_valid")),
    angelListProfile: Yup.string()
    .trim()
    .matches(constants.validURLRegExp, i18n.t("validator.angelList_url_not_valid")),
});

export default investorprofileEditSchema;