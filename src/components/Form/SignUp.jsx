import React from "react";
import { useFormik } from "formik";
import { userSechema } from "./schema";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";

import { signUp } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setIsLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const onSubmit = async (values, actions) => {
    try {
      await dispatch(signUp(values));
      const user = JSON.parse(localStorage.getItem("profile"));
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.log("Sign up  error");
    }
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    actions.resetForm();
  };
  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userSechema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="signUp">
      <h2>SignUp</h2>
      <div className="info">
        <InputField
          name="firstname"
          values={values}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          type="text"
        />
        <InputField
          name="lastname"
          values={values}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          type="text"
        />
      </div>
      <div className="info">
        <InputField
          name="email"
          values={values}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          type="email"
        />
      </div>
      <div className="info">
        <InputField
          name="password"
          values={values}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          type="password"
        />
        <InputField
          name="confirmPassword"
          values={values}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          type="password"
        />
      </div>
      <p>
        Already have an account.
        <span onClick={() => setIsLogin((prev) => !prev)}> Login!</span>
      </p>
      <button type="submit" className={loading ? "btn loading" : "btn"}>
        {loading ? "loading..." : "SignUp"}
      </button>
    </form>
  );
};

export default SignUp;
