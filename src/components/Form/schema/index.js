import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const userSechema = yup.object().shape({
  lastname: yup.string().required("field is required"),
  firstname: yup.string().required("field is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("field is required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a strong password" })
    .required("field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null, "password must match"])
    .required("Field is required"),
});
