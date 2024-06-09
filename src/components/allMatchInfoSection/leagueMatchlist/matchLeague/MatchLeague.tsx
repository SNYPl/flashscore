"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import {
  EmptyFavouriteStarIcon,
  FavouriteStartIcon,
  LeagueArrowIcon,
} from "@/common/svg/home";
import Image from "next/image";

const Match = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  showMatches,
}: {
  homeTeam: any;
  awayTeam: any;
  homeScore: any;
  awayScore: any;
  status: any;
  showMatches: boolean;
}) => (
  <section className={`flex justify-between items-center ${style.match}`}>
    <article className={`flex  p-2 items-center`}>
      <div
        className={`flex items-center justify-center mr-7 ${style.starIcon}`}
      >
        <EmptyFavouriteStarIcon />
      </div>
      <div className="mr-7">
        <h4>15:00</h4>
      </div>
      <div className={`flex items-center flex-col ${style.matchesItems}`}>
        <div className="flex  flex-row mb-1">
          <p className="mr-2">
            <Image src="images/club.svg" alt="club" width={16} height={16} />
          </p>
          <p>Arsenal</p>
        </div>
        <div className="flex  flex-row mb-1">
          <p className="mr-2">
            <Image src="images/club.svg" alt="club" width={16} height={16} />
          </p>
          <p>Everton</p>
        </div>
      </div>
    </article>
    <div
      className={`flex ${style.moreBtn} px-2 py-1 items-center justify-center`}
    >
      <Link href={"#"}>MORE INFO</Link>
    </div>
  </section>
);

const MatchLeague = () => {
  const [showMatches, setShowMatches] = useState(false);
  const matches = [
    {
      homeTeam: "Estudiantes L.P.",
      awayTeam: "Dep. Riestra",
      homeScore: 2,
      awayScore: 0,
      status: "Finished",
    },
    {
      homeTeam: "San Lorenzo",
      awayTeam: "Lanus",
      homeScore: 1,
      awayScore: 1,
      status: "Finished",
    },
    {
      homeTeam: "Racing Club",
      awayTeam: "Argentinos Jrs",
      homeScore: 3,
      awayScore: 0,
      status: "Finished",
    },
    {
      homeTeam: "Rosario Central",
      awayTeam: "Tigre",
      homeScore: 1,
      awayScore: 1,
      status: "Finished",
    },
  ];
  return (
    <section className={``}>
      <article>
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
            <h2 className="ml-2">ENGLAND:</h2>
            <Link href={"#"} className="mr-2">
              PREMIER LEAGUE
            </Link>
          </div>
          <button
            onClick={() => setShowMatches(!showMatches)}
            className={`flex items-center gap-x-2 ${style.showMatchesBtn}`}
          >
            {!showMatches ? (
              <span className={`${style.displayText}`}>
                Display Matches (0)
              </span>
            ) : (
              <span className={`${style.standings}`}>Standings</span>
            )}
            <span
              className={`${style.arrowIconBtn} ${
                showMatches ? style.arrowIconRotate : ""
              }`}
            >
              <LeagueArrowIcon />
            </span>
          </button>
        </div>
        <article className={`${showMatches ? style.showMatcher : "hidden"}`}>
          {matches.map((match, index) => (
            <Match
              key={index}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              homeScore={match.homeScore}
              awayScore={match.awayScore}
              status={match.status}
              showMatches={showMatches}
            />
          ))}
        </article>
      </article>
    </section>
  );
};

export default MatchLeague;
