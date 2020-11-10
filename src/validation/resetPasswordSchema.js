import * as Yup from "yup";
import i18n from "../i18n";
import "./validators";

const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required(i18n.t("validator.password_required"))
    .password(),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], i18n.t("validator.password_match"))
    .required(i18n.t("validator.password_required")),
});

export default resetPasswordSchema;
