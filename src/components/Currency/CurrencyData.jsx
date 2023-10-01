import axios from "axios";

const fetchCurrency = async () => {
  try {
    const axiosURL =
      "https://v6.exchangerate-api.com/v6/36c7f47f7ae2d6851b84c469/latest/USD";
    const fetchCurrencyData = await axios
      .get(axiosURL)
      .then((res) => {
        return res.data.conversion_rates;
      })
      .catch((error) => console.log(error));

    const { USD, EUR } = fetchCurrencyData;
    const newRates = { USD, EUR };
    const baseCurrency = newRates.USD;

    const rates = Object.entries(newRates).map(([currency, rate]) => ({
      currency,
      purchase: rate.toFixed(2),
      sale: (baseCurrency / rate).toFixed(2),
    }));
    return rates;
  } catch (error) {
    alert("Connection error");

    const spaceHolder = [
      {
        currency: "...",
        purchase: "...",
        sale: "...",
      },
    ];
    return spaceHolder;
  }
};

const getCurrencyData = async () => {
  const hour = 60 * 60 * 1000;
  const time = Date.now();

  let oldCurrencyData = JSON.parse(localStorage.getItem("currency")) || [];

  if (Array.isArray(oldCurrencyData)) {
    const oldTime = oldCurrencyData.find((item) => item.timestamp)?.timestamp;
    const isMoreThanHourAge = time - oldTime < hour;

    if (isMoreThanHourAge) {
      const dataWithoutTimestamp = oldCurrencyData.filter(
        (item) => item.currency
      );
      return dataWithoutTimestamp;
    }
  }

  const currencyData = await fetchCurrency();

  if (currencyData[0].currency === "...") {
    return currencyData;
  }
  const forLocalStorage = [{ timestamp: time }, ...currencyData];
  localStorage.setItem("currency", JSON.stringify(forLocalStorage));

  return currencyData;
};

export default getCurrencyData;
