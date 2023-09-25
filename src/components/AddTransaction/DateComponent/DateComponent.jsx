import React from "react";
import Datetime from "react-datetime";

import styles from "./DateComponent.module.css";

export const DateComponent = ({
  field,
  className,
  dateFormat,
  timeFormat,
  value,
  onChange,
}) => {
  return (
    <div className={styles.dateComponent}>
      <Datetime
        name={field.name}
        className={`${className} ${styles.datetime}`}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        value={value}
        onChange={(val) => onChange(val)}
        closeOnSelect={true}
      />
    </div>
  );
};
