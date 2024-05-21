import React from "react";
import style from "./style.module.css";
import League from "./league/League";

const MatchLists = () => {
  return (
    <section className={` mt-5`}>
      <League />
    </section>
  );
};

export default MatchLists;
