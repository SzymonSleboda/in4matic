import React from "react";
import Select, { components } from "react-select";

import { TfiAngleDown } from "react-icons/tfi";

import { selectStyles } from "./SelectComponent.styled";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <TfiAngleDown />
    </components.DropdownIndicator>
  );
};

const SelectComponent = ({
  name,
  options,
  placeholder = "Select",
  className = "",
  onChange = () => {},
}) => {
  return (
    <Select
      name={name}
      className={className}
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      components={{ DropdownIndicator }}
      styles={selectStyles()}
      openMenuOnFocus={true}
      closeMenuOnSelect={true}
      isSearchable={true}
    />
  );
};

export default SelectComponent;
