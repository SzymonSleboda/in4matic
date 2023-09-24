import { useState, useEffect } from "react";
import s from "../Currency/Currency.module.css"

export default function Currency() {
    const [USD, setUSD] = useState({ buy: '00.00', sale: '00.00' });
    const [EUR, setEUR] = useState({ buy: '00.00', sale: '00.00' });

    useEffect(() => { 

    });

    return (
      <div className={s.currency}>
        <ul className={s.currency__titles}>
          <li className={s.currency__title}>Currency</li>
          <li className={s.currency__title}>Purchase</li>
          <li className={s.currency__title}>Sale</li>
        </ul>
        <ul className={s.currency__list}>
          <li className={s.currency__item}>
            <span>USD</span>
            <span>{USD.buy}</span>
            <span>{USD.sale}</span>
          </li>
          <li className={s.currency__item}>
            <span>EUR</span>
            <span>{EUR.buy}</span>
            <span>{EUR.sale}</span>
          </li>
        </ul>
      </div>
    );
};