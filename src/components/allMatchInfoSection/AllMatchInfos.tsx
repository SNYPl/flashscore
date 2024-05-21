import React from "react";
import style from "./style.module.css";
import Calendar from "./calendar/Calendar";
import MatchNavigation from "./matchNavigation/MatchNavigation";
import MatchLists from "./leagueMatchlist/MatchLists";
import InfoText from "./infoText/InfoText";

const AllMatchInfos = () => {
  return (
    <section className={`bg-white rounded-lg ml-4 p-3 w-full ${style.events}`}>
      <Calendar />
      <MatchNavigation />
      <MatchLists />
    </section>
  );
};

export default AllMatchInfos;
