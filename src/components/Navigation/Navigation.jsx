import React from "react";
import { NavLink } from "react-router-dom";
import Media from "react-media";
import s from "../Navigation/Navigation.module.css";
import HomeIcon from "@mui/icons-material/Home";
import TimelineIcon from "@mui/icons-material/Timeline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const Navigation = () => {
  return (
    <div className={s.navigation}>
      <NavLink exact="true" to="/home" className={s.navigation__link} >
        <div className={s.navigation__icon}>
          <HomeIcon fontSize="inherit" />
        </div>
        <span className={s.navigation__text}>Home</span>
      </NavLink>
      <NavLink to="/diagram" className={s.navigation__link}>
        <div className={s.navigation__icon}>
          <TimelineIcon fontSize="inherit" />
        </div>
        <span className={s.navigation__text}>Statistics</span>
      </NavLink>
      <Media
        queries={{
          mobile: "(max-width: 767px)",
        }}
      >
        {({ mobile }) => (
          <>
            {mobile && (
              <NavLink to="/currency" className={s.navigation__link}>
                <div className={s.navigation__icon}>
                  <AttachMoneyIcon fontSize="inherit" />
                </div>
              </NavLink>
            )}
          </>
        )}
      </Media>
    </div>
  );
};
