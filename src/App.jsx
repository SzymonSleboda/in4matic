import { Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";

const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const Statistics = lazy(() => import("./pages/StatisticsPage/StatisticsPage"));
const CurrencyPage = lazy(() => import("./pages/CurrencyPage/CurrencyPage"));

export const App = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/diagram" element={<Statistics />} />
          <Route path="/currency" element={<CurrencyPage />} />
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
