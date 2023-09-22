import React from "react";
import { NavLink } from "react-router-dom";
import s from "components/Navigation/navigation.module.css";
import HomeIcon from "@mui/icons-material/Home";
import TimelineIcon from "@mui/icons-material/Timeline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const Navigation = () => {
  return (
    <div className={s.navigation}>
      <NavLink to="/home" className={s.navigation__link}>
        <div className={s.navigation__icon}>
          <HomeIcon fontSize="inherit" />
        </div>
        <span className={s.navigation__text}>Home</span>
      </NavLink>
      <NavLink to="/statistics" className={s.navigation__link}>
        <div className={s.navigation__icon}>
          <TimelineIcon fontSize="inherit" />
        </div>
        <span className={s.navigation__text}>Statistics</span>
      </NavLink>
      <NavLink to="/currency" className={s.navigation__link}>
        <div className={s.navigation__icon}>
          <AttachMoneyIcon fontSize="inherit" />
        </div>
      </NavLink>
    </div>
  );
};
