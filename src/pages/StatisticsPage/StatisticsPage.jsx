import Media from "react-media";
import css from "./StatisticsPage.module.css";
// import { Spinner } from "../../components/Spinner/Spinner";
import Header from "../../components/Header/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { Balance } from "../../components/Balance/Balance";
import StatisticsContainer from "../../components/StatisticsContainer/StatisticsContainer";
import Currency from "../../components/Currency/Currency";
// import DashboardPage from "../DashboardPage/DashboardPage";
// import { Dashboard } from "@mui/icons-material";

export default function Statistics() {
  return (
    <div className={css.statistics}>
      <Media
        query="(max-width: 767px)"
        render={() => (
          <div>
            <Header />
            <Navigation />
            <StatisticsContainer />
          </div>
        )}
      />

      <div className={css.statistics}>
        <Media
          query="(min-width: 768px) and (max-width: 1279px)"
          render={() => (
            <div>
              <Header />
              <div className={css.blocks}>
                <div>
                  <Navigation />
                  <Balance />
                </div>
                <div>
                  <Currency />
                </div>
                {/* <div>
                  <DashboardPage />
                </div> */}
              </div>
              <div className={css.homeTab}>
                <StatisticsContainer />
              </div>
            </div>
          )}
        />
      </div>
      <div className={css.statistics}>
        <Media
          query="(min-width: 1280px)"
          render={() => (
            <div>
              <Header />
              <div className={css.blocks}>
                <div>
                  {/* <Dashboard /> */}
                  <Navigation />
                  <Balance />
                  <Currency />
                </div>
                <div className={css.rightBlock}>
                  <StatisticsContainer />
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
