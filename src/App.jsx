import { Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import SpinnerComponent from "./components/Spinner/Spinner";

const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const StatisticsPage = lazy(() => import("./pages/StatisticsPage/Spage"));
const CurrencyPage = lazy(() => import("./pages/CurrencyPage/CurrencyPage"));

export const App = () => {
  return (
    <>
      <Suspense fallback={<SpinnerComponent />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/diagram" element={<StatisticsPage />} />
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
