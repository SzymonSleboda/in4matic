import s from "../Currency/Currency.module.css";
import getCurrencyData from "./CurrencyData";

const currencyData = await getCurrencyData();

export default function Currency() {
  return (
    <div className={s.currency}>
      <ul className={s.currency__titles}>
        <li className={s.currency__title}>Currency</li>
        <li className={s.currency__title}>Purchase</li>
        <li className={s.currency__title}>Sale</li>
      </ul>

      <ul className={s.currency__list}>
        {currencyData.map((item, index) => (
          <li className={s.currency__item} key={item.currency + index}>
            <span>{item.currency}</span>
            <span>{item.purchase}</span>
            <span>{item.sale}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
