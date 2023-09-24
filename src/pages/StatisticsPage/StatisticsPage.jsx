import Media from "react-media";
import css from "./StatisticsPage.module.css";
import { Spinner } from "../../components/Spinner/Spinner";
import StatisticsContainer from "../../components/StatisticsContainer/StatisticsContainer";

export default function Statistics() {
  return (
    <>
      <Media
        query="(max-width: 767px)"
        render={() => (
          <>
            {/* <Header />
          <Navigation /> */}
            <Spinner />
            <StatisticsContainer />
          </>
        )}
      />

      <>
        <Media
          query="(min-width: 768px) and (max-width: 1279px)"
          render={() => (
            <>
              {/* <Header /> */}
              <div className={css.box}>
                <div>
                  {/* <Navigation />
                <TotalBalanceComponent /> */}
                </div>
                <div>{/* <CurrencyComponent /> */}</div>
              </div>
              <div className={css.homeTab}>
                <StatisticsContainer />
              </div>
            </>
          )}
        />
      </>
      <>
        <Media
          query="(min-width: 1280px)"
          render={() => (
            <>
              {/* <Header /> */}
              <div className={css.box}>
                <div>
                  {/* <Navigation />
                <TotalBalanceComponent />
                <CurrencyComponent /> */}
                </div>
                <div className={css.boxRight}>
                  <StatisticsContainer />
                </div>
              </div>
            </>
          )}
        />
      </>
    </>
  );
}
