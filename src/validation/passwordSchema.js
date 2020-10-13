import * as Yup from "yup";
import i18n from "../i18n";

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required(i18n.t("validator.password_required"))
    .password(),
})

export default passwordSchema;