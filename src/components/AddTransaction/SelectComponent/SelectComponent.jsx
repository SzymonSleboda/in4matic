import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import css from "./SelectComponent.module.css";
const listOfCategories = [
  "Main expenses",
  "Products",
  "Car",
  "Self care",
  "Child care",
  "Household products",
  "Education",
  "Leisure",
];
const SelectComponent = ({ handleSetCategory }) => {
  const [category, setCategory] = useState("");
  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    handleSetCategory(selectedCategory);
  };
  console.log("Category", category)
  return (
    <div className={css.SelectComponent}>
      <FormControl fullWidth variant="standard" bluronselect="true">
        <Select
          bluronselect="true"
          labelId="expense-category"
          id="expense-category"
          displayEmpty={true}
          value={category}
          onChange={handleChange}
          renderValue={(value) =>
            value?.length
              ? Array.isArray(value)
                ? value.join(", ")
                : value
              : "Select a category"
          }
          sx={{
            padding: "0 0 0 10px",
            color: "#BDBDBD",
            ...(category && {
              color: "#000000",
            }),
          }}
          IconComponent={KeyboardArrowDownIcon}
          MenuProps={{
            disableAutoFocusItem: true,
            PaperProps: {
              style: {
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(25px)",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
              },
            },
            MenuListProps: {
              style: {
                paddingTop: 0,
                paddingBottom: 0,
              },
            },
            marginThreshold: 0,
          }}
          onClose={() => {
            setTimeout(() => {
              document.activeElement.blur();
            }, 0);
          }}
        >
          {listOfCategories.map((category) => (
            <MenuItem
              key={category}
              value={category}
              className={css.DropdownCategories__MenuItem}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default SelectComponent;