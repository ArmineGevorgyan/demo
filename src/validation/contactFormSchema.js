import * as Yup from "yup";
import i18n from "../i18n";

const contactFormSchema = Yup.object().shape({
  message: Yup.string().trim().required(i18n.t("validator.message_required")),
});

export default contactFormSchema;
