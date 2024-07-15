"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Skeleton, Tooltip } from "antd";
import Career from "./career/Career";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";
import { IoShirtOutline, IoFootballOutline } from "react-icons/io5";
import { TbPlayFootball } from "react-icons/tb";

const PlayerCareer = () => {
  const [active, setActive] = useState("League");
  const searchParams = useSearchParams();
  const playerId = searchParams.get("playerId");
  const sportId = searchParams.get("sportId");

  const menu = [
    "League",
    "Domestic Cups",
    "International Cups",
    "National Team",
  ];

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/players/career",
    params: {
      player_id: playerId,
      sport_id: sportId,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  // const { data, isLoading, isError, isFetched, isFetching } = useQuery(
  //   ["teamSquad", teamId, sportId],
  //   async () => {
  //     try {
  //       const response = await axios.request(options);
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error fetching result events", error);
  //       throw new Error("Error fetching result events");
  //     }
  //   },
  //   { refetchOnWindowFocus: false }
  // );

  // if (isLoading) {
  //   return (
  //     <div className="p-4">
  //       <Skeleton />
  //     </div>
  //   );
  // }

  return (
    <article className={`${style.playerStats} bg-white rounded-lg p-4 `}>
      <div>
        <div className={`flex items-center mb-4 gap-x-3 ${style.nav}`}>
          {menu.map((el, id) => (
            <button
              className={`${active === el ? style.active : ""}`}
              onClick={() => setActive(el)}
              key={id}
            >
              {el}
            </button>
          ))}
        </div>
      </div>
      return (
      <article className={` mb-6`}>
        <h4 className="font-semibold text-xl mb-3">test</h4>
        <div className={style.titles}>
          <p>Season</p>
          <p>Team</p>
          <p>Competition</p>
          <p>R</p>

          <Tooltip title="Matches Played">
            <p>
              <IoShirtOutline />
            </p>
          </Tooltip>
          <p>MIN</p>
          <Tooltip title="Goals">
            <p>
              <IoFootballOutline />
            </p>
          </Tooltip>
          <Tooltip title="Assist">
            <p>
              <TbPlayFootball />
            </p>
          </Tooltip>

          <div className={`${style.card} ${style.cardYellow}`}></div>

          <div className={`${style.card} ${style.cardRed}`}></div>
        </div>
        <div className={`${style.infoItemSection} `}>
          {/* <Career
                    key={player.PLAYER_ID}
                    id={player.PLAYER_ID}
                    name={player.PLAYER_NAME}
                    number={player.PLAYER_JERSEY_NUMBER}
                    image={player.PLAYER_IMAGE_PATH}
                    playerEvents={filteredEvents}
                    isLoading={isLoading}
                    typeId={player.PLAYER_TYPE_ID}
                  /> */}
        </div>
      </article>
      );
    </article>
  );
};

export default PlayerCareer;
