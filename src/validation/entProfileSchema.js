import * as Yup from "yup";
import i18n from "../i18n";
import "./validators";

const entProfileSchema = Yup.object().shape({
  location: Yup.string()
    .trim()
    .required(i18n.t("validator.email_required")),
});

export default entProfileSchema;