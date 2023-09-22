import styles from "./Button.css";
import PropTypes from "prop-types";
export const Button = ({ color, children, ...props }) => {
  console.log(styles);
  const getType = () => {
    if (color === "primary") {
      return "primary";
    } else if (color === "secondary") {
      return "secondary";
    }
  };

  return (
    <button className={`btn ${getType()}`} {...props}>
      {children}{" "}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary"]).isRequired,
};
