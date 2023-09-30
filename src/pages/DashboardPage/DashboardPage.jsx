import s from "../DashboardPage/DashboardPage.module.css";
import Header from "../../components/Header/Header";
// import HomeTab
// import Table
import { Navigation } from "../../components/Navigation/Navigation";
import { Balance } from "../../components/Balance/Balance";
import Currency from "../../components/Currency/Currency";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import { ButtonAddTransactions } from "../../components/ButtonAddTransactions/ButtonAddTransactions";
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
          {location.pathname === "/dashboard" && (
            <div className={s.dashboard__balance}>
              <Balance />
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className={s.dashboard}>
      <Header />
      <div className={s.dashboard__content}>
        <div className={s.dashboard__left}>
          <div className={s.dashboard__navigation}>
            <Navigation />
          </div>
          {deviceType === "mobile" ? (
            location.pathname === "/home" && (
              <div className={s.dashboard__balance}>
                <Balance />
              </div>
            )
          ) : (
            <div className={s.dashboard__balance}>
              <Balance />
            </div>
          )}
          {deviceType === "desktop" && (
            <div className={s.dashboard__currency}>
              <Currency />
            </div>
          )}
        </div>
        <div className={s.dashboard__right}>
          {deviceType === "desktop" ? (
            children
          ) : (
            <div className={s.dashboard__currency}>
              <Currency />
            </div>
          )}
        </div>
        {deviceType !== "desktop" && children}
      </div>
      <ButtonAddTransactions />
    </div>
  );
}
