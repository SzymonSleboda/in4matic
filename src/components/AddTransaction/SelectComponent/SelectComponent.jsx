import React from "react";
import Select, { components } from "react-select";
import { TfiAngleDown } from "react-icons/tfi";

import css from "./SelectComponent.module.css";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <TfiAngleDown />
    </components.DropdownIndicator>
  );
};

export const SelectComponent = ({
  name,
  options,
  placeholder = "Select",
  className = "",
  onChange = () => {},
}) => {
  return (
    <div className={css.selectComponent}>
      <Select
        name={name}
        className={`${css.select} ${className}`}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        components={{ DropdownIndicator }}
        styles={css()}
        openMenuOnFocus={true}
        closeMenuOnSelect={true}
        isSearchable={true}
      />
    </div>
  );
};
