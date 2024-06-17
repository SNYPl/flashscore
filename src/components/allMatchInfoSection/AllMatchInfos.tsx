import React from "react";
import style from "./style.module.css";
import Calendar from "./calendar/Calendar";
import MatchNavigation from "./matchNavigation/MatchNavigation";
import MatchLists from "./leagueMatchlist/MatchLists";
import InfoText from "./infoText/InfoText";
import Image from "next/image";

const AllMatchInfos = () => {
  return (
    <section className={`${style.events}`}>
      <article className={`bg-white rounded-lg  p-3 w-full `}>
        <Calendar />
        <MatchNavigation />
        <MatchLists />
      </article>
      <article className={`${style.ad} mt-4   w-full`}>
        <Image
          src="/images/home/baner(688).png"
          alt="ad"
          width={704}
          height={100}
          className="w-full"
        />
      </article>
      <article className="w-full mt-3 ">
        <InfoText />
      </article>
    </section>
  );
};

export default AllMatchInfos;
