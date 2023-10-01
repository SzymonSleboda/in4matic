import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import logo from "../../assets/icons/logo.svg";
import { PasswordStrength } from "../PasswordStrength/PasswordStrength";
import { register } from "../../redux/auth/auth-operations";

import css from "./RegistrationFrom.module.css";

export const RegistrationForm = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address.")
      .required("Please provide your email."),
    password: Yup.string()
      .required("Please provide your password.")
      .min(6, "Password is too short - should be 6 characters minimum.")
      .max(12, "Password is too long - should be 12 characters maximum."),
    confirmPassword: Yup.string()
      .required("Please re-type your password.")
      .oneOf([Yup.ref("password")], "Passwords do not match."), // Poprawione odwołanie do pola hasła
    name: Yup.string()
      .required("Please provide your name")
      .min(1, "First name is too short - should be 1 character minimum.")
      .max(12, "First name is too long - should be 12 characters or less."),
  });

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = ({ name, email, password }) => {
    dispatch(register({ name, email, password }));
    navigate("/login");
  };

  const screenWidth = window.innerWidth;

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
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
                    bottom: screenWidth < 765 ? "-50px" : "-30px",
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
                onInput={(e) => setPassword(e.target.value)}
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
            <PasswordStrength password={password} />
            <div className={css.inputContainer}>
              {touched.confirmPassword && errors.confirmPassword ? (
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
                  {errors.confirmPassword}
                </p>
              ) : null}

              <LockIcon
                className={css.inputIcon}
                style={{ color: "#e0e0e0" }}
              />
              <input
                className={css.input}
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password"
                value={values.confirmPassword}
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
            <div className={css.inputContainer}>
              {touched.name && errors.name ? (
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
                  {errors.name}
                </p>
              ) : null}

              <AccountBoxIcon
                className={css.inputIcon}
                style={{ color: "#e0e0e0" }}
              />
              <input
                className={css.input}
                type="text"
                name="name"
                id="name"
                placeholder="First name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className={css.buttonContainer}>
              <button
                type="submit"
                className={css.registerButton}
                disabled={!isValid && !dirty}
              >
                Register
              </button>
              <Link to="/login">
                <button type="button" className={css.logInButton}>
                  Log in
                </button>
              </Link>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
