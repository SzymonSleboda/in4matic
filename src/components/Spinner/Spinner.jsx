import css from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <div>
      <span className={css.loader}></span>
    </div>
  );
};
