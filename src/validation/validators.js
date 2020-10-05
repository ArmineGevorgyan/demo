import * as Yup from "yup";
import i18n from "../i18n";

Yup.addMethod(Yup.string, "password", function () {
  return this.test("password", i18n.t("validator.password_rule"), function (
    value
  ) {
    if (value) {
      // Password should contain 8 or more characters
      // Must contain both letters and number, no leading or trailing whitespaces and no accented characters
      const pattern = /^(?!\s)(?![\s\S]*\s$)((?=.*[a-zA-Z])(?=.*[0-9])(?!.*[À-ÿ]).{8,})/;

      return !!value.match(pattern);
    }

    return true;
  });
});
