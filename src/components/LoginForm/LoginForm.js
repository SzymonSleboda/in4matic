import EmailIcon from "../../images/icons/email.svg";
import PasswordIcon from "../../images/icons/password.svg";
import LogoIcon from "../../images/icons/logo.svg";
import { Button } from "../UIElements/Button/Button";
import css from "./LoginForm.module.css";
import { useDispatch, useSlice } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import * as Yup from "yup";
import { Formik } from "formik";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
  };
  const signUpSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^\w+[\w-.]*\w@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
        "Must be a valid email (latin letters). For example: example123@example.com"
      )
      .email("Must be a valid email!")
      .min(10)
      .max(63)
      .required("Required field"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/,
        "Only numbers and Latin letters are allowed"
      )
      .min(6, "Minimum 6 characters required")
      .max(12, "Maximum 12 characters")
      .required("Required field"),
  });

  return (
    <div className={css.loginFormWrapper}>
      <div className={css.loginForm}>
        <div className={css.boxForm}>
          <div className={css.loginFormHeader}>
            <img className={css.logoIcon} src={LogoIcon}></img>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={signUpSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(false);

              resetForm();
            }}
            validateOnMount>
            {({ handleBlur, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <label className={`${css.textField} ${css.loginFormField}`}>
                  <img src={EmailIcon}></img>

                  <input
                    placeholder='E-mail'
                    name='email'
                    type='email'
                    className={css.input}></input>
                </label>

                {errors.email && touched.email && <div>{errors.email}</div>}

                <label className={`${css.textField} ${css.loginFormField}`}>
                  <img className={css.passwordIcon} src={PasswordIcon}></img>

                  <input
                    placeholder='Password'
                    name='password'
                    type='password'
                    className={`${css.input} ${css.inputPassword}`}></input>
                </label>
                <Button
                  className={`${css.btn} ${css.primary} ${css.loginFormField}`}
                  color='primary'
                  onClick={() => {
                    console.log("");
                  }}
                  type='submit'>
                  Log in
                </Button>
                <Button
                  className={`${css.btn} ${css.secondary}  ${css.loginFormField}`}
                  color='secondary'
                  type='button'>
                  Register
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
