import EmailIcon from "../../assets/icons/email.svg";
import PasswordIcon from "../../assets/icons/password.svg";
import LogoIcon from "../../assets/icons/logo-loginForm.svg";
import css from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { login } from "../../redux/auth/auth-operations";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = values => {
    dispatch(login(values));
  };
  const signUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address.")
      .required("Please provide your email."),
    password: Yup.string()
      .required("Please provide your password.")
      .min(6, "Password is too short - should be 6 characters minimum.")
      .max(12, "Password is too long - should be 12 characters maximum."),
  });

  return (
    <div className={css.loginFormWrapper}>
      <div className={css.loginForm}>
        <div className={css.boxForm}>
          <div className={css.loginFormHeader}>
            <img className={css.logoIcon} src={LogoIcon} alt='logo-icon'></img>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={signUpSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <label className={`${css.textField} ${css.loginFormField}`}>
                  <img src={EmailIcon} alt='email-icon'></img>

                  <input
                    placeholder='E-mail'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={css.input}></input>
                </label>

                {errors.email && touched.email && (
                  <span className={css.validation}>{errors.email}</span>
                )}
                <label className={`${css.textField} ${css.loginFormField}`}>
                  <img
                    className={css.passwordIcon}
                    src={PasswordIcon}
                    alt='password-icon'></img>

                  <input
                    placeholder='Password'
                    name='password'
                    type='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={`${css.input} ${css.inputPassword}`}></input>
                </label>

                {errors.password && touched.password && (
                  <span className={css.validation}>{errors.password}</span>
                )}

                <button
                  disabled={isSubmitting}
                  className={`${css.btn} ${css.primary} ${css.loginFormField}`}
                  color='primary'
                  onClick={() => {}}
                  type='submit'>
                  Log in
                </button>
                <button
                  disabled={isSubmitting}
                  className={`${css.btn} ${css.secondary}  ${css.loginFormField}`}
                  color='secondary'
                  type='button'>
                  Register
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
