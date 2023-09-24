import { passwordStrength } from "check-password-strength";

import css from "./PasswordStrength.module.css";

export const PasswordStrength = (props) => {
  const strength = passwordStrength(props.value, [
    {
      id: 0,
      value: "Tooweak",
      minDiversity: 0,
      minLength: 0,
    },
    {
      id: 1,
      value: "Weak",
      minDiversity: 2,
      minLength: 6,
    },
    {
      id: 2,
      value: "Medium",
      minDiversity: 3,
      minLength: 8,
    },
    {
      id: 3,
      value: "Strong",
      minDiversity: 4,
      minLength: 12,
    },
  ]).value;

  let progress;

  if (strength === "Tooweak") {
    progress = 25;
  } else if (strength === "Weak") {
    progress = 50;
  } else if (strength === "Medium") {
    progress = 75;
  } else {
    progress = 100;
  }

  return <div className={css.container} value={progress} max="100"></div>;
};
