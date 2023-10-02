import React from "react"; // Import React
// import s from "../DashboardPage/DashboardPage.module.css";
import s from "../StatisticsPage/Spage.module.css";
import Header from "../../components/Header/Header";
// import HomeTab from "../../components/HomeTab/HomeTab";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import { Navigation } from "../../components/Navigation/Navigation";
import { Balance } from "../../components/Balance/Balance";
import Currency from "../../components/Currency/Currency";
// import { ButtonAddTransactions } from "../../components/ButtonAddTransactions/ButtonAddTransactions";
import StatisticsContainer from "../../components/StatisticsContainer/StatisticsContainer";
import { useLocation } from "react-router-dom";

export default function StatisticsPage({ children }) {
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

          {location.pathname === "/diagram" && (
            <div>
              <div className={s.dashboard__balance}>
                <StatisticsContainer />
              </div>
              {/* <HomeTab /> */}
              {/* <ButtonAddTransactions /> */}
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
                <StatisticsContainer />
              </div>
            ) : (
              <div className={s.dashboard__currency}>
                <Currency />
              </div>
            )}
          </div>
          {deviceType !== "desktop" && (
            <div>
              <StatisticsContainer />
            </div>
          )}
          {<div>{/* <ButtonAddTransactions /> */}</div>}
          {deviceType !== "desktop" && children}
        </div>
      </div>
    );
  }
}
