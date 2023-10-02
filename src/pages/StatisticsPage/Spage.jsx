import React, { Suspense } from "react";
import s from "../DashboardPage/DashboardPage.module.css";
import Header from "../../components/Header/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { Balance } from "../../components/Balance/Balance";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import { useLocation } from "react-router-dom";

const Currency = React.lazy(() => import("../../components/Currency/Currency"));
const StatisticsContainer = React.lazy(() => import("../../components/StatisticsContainer/StatisticsContainer"));

export default function StatisticsPage({ children }) {
  const { deviceType } = useDeviceSize();
  const location = useLocation();

  return (
    <div className={s.dashboard}>
      <Header />
      <div className={s.dashboard__content}>
        <div className={s.dashboard__left}>
          <div className={s.dashboard__navigation}>
            <Navigation />
          </div>
          <Balance />
          {deviceType === "desktop" && (
            <Suspense fallback={null}>
              <div className={s.componentSpacer} /> {/* Odstęp */}
              <Currency />
            </Suspense>
          )}
        </div>
        <div className={s.dashboard__right}>
          {deviceType === "desktop" ? (
            <div className={s.dashboard__table}>
              <Suspense fallback={null}>
                <StatisticsContainer />
              </Suspense>
            </div>
          ) : (
            <div className={s.dashboard__currency}>
              <Suspense fallback={null}>
                <Currency />
              </Suspense>
            </div>
          )}
          {deviceType !== "desktop" && (
            <div className={s.dashboard__table}>
              <Suspense fallback={null}>
                <StatisticsContainer />
              </Suspense>
            </div>
          )}
          <div className={s.invisibleBox}>
            {/* <ButtonAddTransactions /> */}
          </div>
          {deviceType !== "desktop" && children}
        </div>
      </div>
    </div>
  );
}