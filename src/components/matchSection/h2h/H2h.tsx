import React from "react";
import style from "./style.module.css";
import H2hNavigation from "./h2h2Navigation/H2hNavigation";
import MatchLeague from "@/components/allMatchInfoSection/leagueMatchlist/matchLeague/MatchLeague";

const H2h: React.FC = () => {
  return (
    <section className={`${style.h2h} p-3 pt-0`}>
      <H2hNavigation />
      <section className={` mt-5`}>
        <MatchLeague />
      </section>
    </section>
  );
};

export default H2h;
