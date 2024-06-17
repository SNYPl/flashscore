import React from "react";
import style from "./style.module.css";
import LeagueMatch from "@/components/leagueMatch/LeagueMatch";
import { EmptyFavouriteStarIcon } from "@/common/svg/home";
import Image from "next/image";
import Link from "next/link";

const ScheduledMatches: React.FC = ({}) => {
  return (
    <section
      className={`${style.todayMatches} py-4 px-3 bg-white mb-4 rounded-lg`}
    >
      <h2 className="font-bold">Scheduled</h2>

      <div className={`flex justify-between ${style.premierTitle} p-2`}>
        <div className={`flex items-center `}>
          <div className={`mr-3 cursor-pointer ${style.starIcon}`}>
            <EmptyFavouriteStarIcon />
          </div>
          <Image
            src="/images/userSection/Flag.svg"
            alt="flag"
            width={18}
            height={13}
          />
          <h4 className="ml-2">ENGLAND:</h4>
          <Link href={"#"} className="mr-2">
            PREMIER LEAGUE
          </Link>
        </div>
        <button className={`flex items-center gap-x-2 ${style.showMatchesBtn}`}>
          <span className={`${style.standings}`}>Standings</span>
        </button>
      </div>

      <LeagueMatch showMoreBtn />
      <LeagueMatch showMoreBtn />
      <LeagueMatch showMoreBtn />
      <div className={style.moreMatches}>
        <button>Show More Matches</button>
      </div>
    </section>
  );
};

export default ScheduledMatches;
