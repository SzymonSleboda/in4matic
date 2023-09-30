import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
// import Layout from './layout/Layout';
// import WithAuthRedirect from './routes/WithAuthRedirect';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
// import { ModalLogout } from './components/ModalLogout/ModalLogout';
// import { AddTransactionModal } from './components/AddTransactionModal/AddTransactionModal';
// import { EditTransactionModal } from './components/EditTransactionModal/EditTransactionModal';
// import { LoaderGlobal } from './components/Loader/LoaderGlobal';
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const Statistics = lazy(() => import("./pages/StatisticsPage/StatisticsPage"));
export const App = () => {
  return (
    <>
      {/* {showLoader && !delayCompleted ? <LoaderGlobal /> : null}
      {isModalLogoutOpen && <ModalLogout />}
      {isModalAddTransactionOpen && <AddTransactionModal />}
      {isModalEditTransactionOpen && <EditTransactionModal />} */}
      <Suspense>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/diagram" element={<Statistics />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          pauseOnHover={false}
        />
      </Suspense>
    </>
  );
};
