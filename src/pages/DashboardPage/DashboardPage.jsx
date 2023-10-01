import React from "react"; // Import React
import s from "../DashboardPage/DashboardPage.module.css";
import Header from "../../components/Header/Header";
import HomeTab from "../../components/HomeTab/HomeTab";
import Table from "../../components/Table/Table";
import { Navigation } from "../../components/Navigation/Navigation";
import { Balance } from "../../components/Balance/Balance";
import Currency from "../../components/Currency/Currency";
import { ButtonAddTransactions } from "../../components/ButtonAddTransactions/ButtonAddTransactions";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import { useLocation } from "react-router-dom";

export default function DashboardPage({ children }) {
  const { deviceType } = useDeviceSize();
  const location = useLocation();

  if (deviceType === "mobile") {
    return (
      <div className={s.dashboard}>
        <Header />
        <div className={s.dashboard__content}>
          <div className={s.dashboard__navigation}>
            <Navigation />
          </div>

          {location.pathname === "/home" && (
            <div>
              <div className={s.dashboard__balance}>
                <Balance />
              </div>
              <HomeTab />
              <ButtonAddTransactions />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className={s.dashboard}>
        <Header />
        <div className={s.dashboard__content}>
          <div className={s.dashboard__left}>
            <div className={s.dashboard__navigation}>
              <Navigation />
              <Balance />
            </div>
            {deviceType === "desktop" && (
              <div className={s.dashboard__currency}>
                <Currency />
              </div>
            )}
          </div>
          <div className={s.dashboard__right}>
            {deviceType === "desktop" ? (
              <div className={s.dashboard__table}>
                <Table />
              </div>
            ) : (
              <div className={s.dashboard__currency}>
                <Currency />
              </div>
            )}
          </div>
          {deviceType !== "desktop" && (
            <div className={s.dashboard__table}>
              <Table />
            </div>
          )}
          <div>
            <ButtonAddTransactions />
          </div>
          {deviceType !== "desktop" && children}
        </div>
      </div>
    );
  }
}
