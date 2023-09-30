import Currency from "../../components/Currency/Currency";
import { Navigation } from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";
import { useDeviceSize } from "../../hooks/useDeviceSize";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "../CurrencyPage/CurrencyPage.module.css"

export default function CurrencyPage() {
    const navigate = useNavigate();
    const { deviceType } = useDeviceSize();

    useEffect(() => {
        if (deviceType !== 'mobile') {
            navigate("/home")
        }
    }, [deviceType, navigate]);

    return (
      <div className={s.currencyPage}>
        <Header />
        <div className={s.currencyPage__nav}>
          <Navigation />
        </div>
        <div className={s.currencyPage__currency}>
          <Currency />
        </div>
      </div>
    );
};