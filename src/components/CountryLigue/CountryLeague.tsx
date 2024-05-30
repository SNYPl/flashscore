import React from "react";
import style from "./style.module.css";
import LeagueNavigation from "./leagueNavigation/LeagueNavigation";
import Matches from "./matches/Matches";

const CountryLeague = () => {
  return (
    <section className={`${style.countryLeague}`}>
      <LeagueNavigation />
      <Matches />
    </section>
  );
};

export default CountryLeague;
