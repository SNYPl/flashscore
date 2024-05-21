"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import { EmptyFavouriteStarIcon, FavouriteStartIcon } from "@/common/svg/home";

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
  <div>
    <p>
      <strong>{homeTeam}</strong> vs <strong>{awayTeam}</strong>
    </p>
    <p>
      Score: {homeScore} - {awayScore}
    </p>
    <p>Status: {status}</p>
  </div>
);

const League = () => {
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
      <div>
        <EmptyFavouriteStarIcon />
        <h2>ARGENTINA</h2>
        <h3>Liga Profesional</h3>
        <button onClick={() => setShowMatches(!showMatches)}>
          Display Matches (0)
        </button>
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
      </div>
    </section>
  );
};

export default League;
