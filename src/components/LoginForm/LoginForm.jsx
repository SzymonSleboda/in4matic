import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import css from "./LoginForm.module.css";
import logo from "../../assets/icons/logo.svg";
import { login } from "../../redux/auth/auth-operations";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const signUpSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address.")
      .required("Please provide your email."),
    password: Yup.string().required("Please provide your password."),
  });

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = ({ email, password }) => {
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/home"); 
      });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={signUpSchema}
      validateOnBlur
    >
      {({
        handleChange,
        handleBlur,
        touched,
        isValid,
        dirty,
        values,
        errors,
      }) => (
        <div className={css.formContainer}>
          <Form className={css.form}>
            <div className={css.logoContainer}>
              <img className={css.logo} alt="Logo" src={logo} />
              <h1 className={css.title}>Wallet</h1>
            </div>
            <div className={css.inputContainer}>
              {touched.email && errors.email ? (
                <p
                  style={{
                    color: "#ff6596",
                    position: "absolute",
                    bottom: "-30px",
                    left: "0",
                    fontFamily: "Poppins",
                    fontSize: "13px",
                  }}
                >
                  {errors.email}
                </p>
              ) : null}

              <EmailIcon
                className={css.inputIcon}
                style={{ color: "#e0e0e0" }}
              />
              <input
                className={css.input}
                type="text"
                name="email"
                id="email"
                placeholder="E-mail"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className={css.inputContainer}>
              {touched.password && errors.password ? (
                <p
                  style={{
                    color: "#ff6596",
                    position: "absolute",
                    bottom: "-30px",
                    left: "0",
                    fontFamily: "Poppins",
                    fontSize: "13px",
                  }}
                >
                  {errors.password}
                </p>
              ) : null}

              <LockIcon
                className={css.inputIcon}
                style={{ color: "#e0e0e0" }}
              />
              <input
                className={css.input}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span
                onClick={handlePasswordVisibility}
                className={css.passwordVisibilityToggle}
              >
                {showPassword ? (
                  <VisibilityOffIcon style={{ color: "#e0e0e0" }} />
                ) : (
                  <VisibilityIcon style={{ color: "#e0e0e0" }} />
                )}
              </span>
            </div>

            <div className={css.buttonContainer}>
              <button type="submit" className={css.mainButton}>
                Log in
              </button>
              <Link to="/register">
                <button
                  type="button"
                  className={css.secondaryButton}
                  disabled={!isValid && !dirty}
                >
                  Register
                </button>
              </Link>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};