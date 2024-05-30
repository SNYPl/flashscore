import React from "react";
import style from "./style.module.css";
import MatchesMenu from "./matchesMenu/MatchesMenu";
import MatchesInfo from "./matchesInfo/MatchesInfo";

const Matches = () => {
  return (
    <section className={`${style.matches}`}>
      <MatchesMenu />
      <MatchesInfo />
    </section>
  );
};

export default Matches;
