"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import MatchItem from "../tableTeamInfo/TableTeamInfo";
import MatchesInfoTips from "./matchesInfoTips/MatchesInfoTips";
import { useQuery } from "react-query";
import axios from "axios";

interface tableProps {
  setApiMenuRequest: any;
  apiMenuRequest: string;
  seasonId: string | null;
  leagueId: string;
}

const StandingTable: React.FC<tableProps> = ({
  setApiMenuRequest,
  apiMenuRequest,
  seasonId,
  leagueId,
}) => {
  const [tableMenu, setTableMenu] = useState("OVERALL");

  const menu = ["OVERALL", "HOME", "AWAY"];

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/tournaments/standings",
    params: {
      tournament_season_id: seasonId,
      standing_type: apiMenuRequest,
      locale: "en_INT",
      tournament_stage_id: leagueId,
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, refetch } = useQuery(
    ["matchTable", apiMenuRequest, leagueId, seasonId],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching table data ", error);
        throw new Error("Error fetching table data");
      }
    }
  );

  const decisionData = data?.META?.DECISIONS || [];

  return (
    <section className={`${style.info}`}>
      <ul className="flex items-center gap-x-2 pb-3 p-2">
        {menu.map((el, index) => (
          <li
            key={index}
            className={`${tableMenu === el ? style.activeMenu : ""}`}
            onClick={() => {
              setTableMenu(el);
              setApiMenuRequest(el.toLocaleLowerCase());
            }}
          >
            <button>{el}</button>
          </li>
        ))}
      </ul>

      {data?.DATA.map((el: any) => {
        return (
          <article key={el.GROUP_ID}>
            <div>
              <div
                className={`${style.infoTableTitle} flex items-center  p-2 gap-x-2`}
              >
                <p className="flex items-center justify-center font-bold">
                  #
                  <svg
                    width="6"
                    height="4"
                    viewBox="0 0 6 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-0.5"
                  >
                    <path d="M3 0L6 4H0L3 0Z" fill="#2E3E46" />
                  </svg>
                </p>
                <p className="font-bold">{el.GROUP}</p>
                <p className="flex items-center justify-center font-normal">
                  MP
                </p>
                <p className="flex items-center justify-center font-normal">
                  W
                </p>
                <p className="flex items-center justify-center font-normal">
                  D
                </p>
                <p className="flex items-center justify-center font-normal">
                  L
                </p>
                <p className="flex items-center justify-center font-normal">
                  G
                </p>
                <p className="flex items-center justify-center font-normal">
                  GD
                </p>
                <p className="flex items-center justify-center font-bold">
                  PTS
                </p>
                <p className="flex items-center justify-center font-normal">
                  FORM
                </p>
              </div>
            </div>
            {el.ROWS?.map((el: any) => {
              return (
                <MatchItem
                  key={el.TEAM_ID}
                  id={el.TEAM_ID}
                  name={el.TEAM_NAME}
                  mp={el.MATCHES_PLAYED}
                  wins={el.WINS}
                  goals={el.GOALS}
                  points={el.POINTS}
                  rank={el.RANKING}
                  image={el.TEAM_IMAGE_PATH}
                />
              );
            })}
          </article>
        );
      })}

      <MatchesInfoTips
        qualification={data?.META.QUALIFICATION_INFO}
        decisionData={decisionData}
      />
      {decisionData?.length !== 0 && (
        <p className={style.infoText}>{decisionData[0]}</p>
      )}
    </section>
  );
};

export default StandingTable;
