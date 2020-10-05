import * as Yup from "yup";
import i18n from "../i18n";
import "./validators";

const registrationSchema = Yup.object().shape({
  password: Yup.string()
    .required(i18n.t("validator.password_required"))
    .password(),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], i18n.t("validator.password_match"))
    .required(i18n.t("validator.password_required")),
  firstName: Yup.string().required(i18n.t("validator.first_name_required")),
  lastName: Yup.string().required(i18n.t("validator.last_name_required")),
});

export default registrationSchema;
