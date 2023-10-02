import React from "react";
import css from "./Spinner.module.css";

const SpinnerComponent = () => {
  return (
    <div>
      <span className={css.loader}></span>
    </div>
  );
};

export default SpinnerComponent;