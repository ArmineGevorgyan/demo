import * as Yup from "yup";
import i18n from "../i18n";
import "./validators";

const entProfileEditSchema = Yup.object().shape({
  fullName:Yup.string().trim().required(i18n.t("validator.fullName_required")),
  bio: Yup.string()
    .trim()
    .required(i18n.t("validator.bio_required")),
  locations: Yup.string()
    .trim()
    .required(i18n.t("validator.location_required")),
  availableVia: Yup.string()
    .trim()
    .required(i18n.t("validator.availableVia_rquired"))
    .url(i18n.t("validator.availableVia_url")),
});

export default entProfileEditSchema;