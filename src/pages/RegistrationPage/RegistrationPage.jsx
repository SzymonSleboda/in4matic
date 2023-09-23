import React from "react";
import Media from "react-media";

import frame from "../../assets/images/RegistrationPage/Desktop/frame-desktop.png";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm";

import css from "./RegistrationPage.module.css";

export const RegistrationPage = () => {
  return (
    <div className={css.mainContainer}>
      <Media
        query="(min-width: 767px)"
        render={() => (
          <div className={css.logoContainer}>
            <img
              className={css.registrationImage}
              src={frame}
              alt="Girl stands next to a large smartphone"
            />
            <h1 className={css.title}>Finance App</h1>
          </div>
        )}
      />
      <div className={css.formContainer}>
        <RegistrationForm />
      </div>
    </div>
  );
};
