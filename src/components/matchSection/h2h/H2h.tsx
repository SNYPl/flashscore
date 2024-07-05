import React from "react";
import style from "./style.module.css";
import H2hNavigation from "./h2h2Navigation/H2hNavigation";
import MatchLeague from "@/components/allMatchInfoSection/leagueMatchlist/matchLeague/MatchLeague";
import MatchInfoList from "./matchInfoList/MatchInfoList";

const H2h = ({ data }: { data: any }) => {
  console.log(data);
  return (
    <section className={`${style.h2h} p-3 pt-0`}>
      <H2hNavigation />
      <section className={`mt-5`}>
        <MatchInfoList />
      </section>
    </section>
  );
};

export default H2h;
