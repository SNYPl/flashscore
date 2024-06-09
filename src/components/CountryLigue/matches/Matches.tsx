import React from "react";
import style from "./style.module.css";
import MatchesMenu from "./matchesMenu/MatchesMenu";
import MatchesInfo from "./matchesInfo/MatchesInfo";
import MatchesInfoTips from "./matchesInfo/matchesInfoTip/MatchesInfoTips";

const Matches = () => {
  return (
    <section className={`${style.matches} bg-white p-4 rounded-xl`}>
      <MatchesMenu />
      <MatchesInfo />
      <MatchesInfoTips />
      <p className={style.infoText}>
        If teams finish on equal points at the end of the season, score
        difference will be the tie-breaker.
      </p>
    </section>
  );
};

export default Matches;
