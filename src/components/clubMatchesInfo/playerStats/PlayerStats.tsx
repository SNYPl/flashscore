"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Select, Skeleton, Space } from "antd";
import Player from "./player/Player";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";

const PlayerStats = () => {
  const [active, setActive] = useState("ALL");
  const searchParams = useSearchParams();
  const teamId = searchParams.get("id");
  const sportId = searchParams.get("sportId");
  const [playerData, setPlayerData] = useState<any[]>([]);

  const menu = [
    "ALL",
    "GOALS",
    "ASSISTS",
    "SHOTS ON TARGET",
    "YELLOW CARDS",
    "RED CARDS",
  ];

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/teams/squad",
    params: {
      sport_id: sportId,
      team_id: teamId,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["teamSquad", teamId, sportId],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching result events", error);
        throw new Error("Error fetching result events");
      }
    },
    { refetchOnWindowFocus: false }
  );

  const playersArray =
    data?.DATA.flatMap((el: any) =>
      el.ITEMS.filter((item: any) => item.PLAYER_ID).map(
        (item: any) => item.PLAYER_ID
      )
    ) || [];

  async function getPlayerInfo(playerId: string) {
    const Playeroptions = {
      method: "GET",
      url: "https://flashlive-sports.p.rapidapi.com/v1/players/last-events",
      params: {
        sport_id: sportId,
        locale: "en_INT",
        player_id: playerId,
      },
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
        "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(Playeroptions);
      return response.data;
    } catch (error) {
      console.error("Error fetching result events", error);
      throw new Error("Error fetching result events");
    }
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const delay = async (ms: number) =>
    await new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const playersDataArray: any[] = [];

    async function fetchPlayerInfo() {
      if (playersArray.length !== 0) {
        for (let i: number = 1; i <= 2; i++) {
          const data = await getPlayerInfo(playersArray[i - 1]);
          if (data) {
            playersDataArray.push({
              playerId: playersArray[i - 1],
              data: data?.DATA,
            });
          }
          await delay(1000);
        }
      }
      if (playersArray.slice(0, 2).length === playersDataArray.length) {
        setPlayerData(playersDataArray);
      }
    }

    if (playersArray.length !== 0) {
      fetchPlayerInfo();
    }
  }, [playersArray.length]);

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton />
      </div>
    );
  }

  // Merging function
  const mergePlayerEvents = (playerGroups: any, eventsData: any) => {
    return playerGroups.map((group: any) => {
      return {
        ...group,
        ITEMS: group.ITEMS.map((player: any) => {
          const playerEvents =
            eventsData.find((event: any) => event.playerId === player.PLAYER_ID)
              ?.data || [];
          return { ...player, events: playerEvents };
        }),
      };
    });
  };

  // Merged player data with events
  const mergedPlayerData = mergePlayerEvents(data?.DATA, playerData);
  console.log(mergedPlayerData);

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
        <div>
          <div className="w-full mb-4">
            <Space wrap className={style.selector} style={{ width: "100%" }}>
              <Select
                defaultValue="Laliga"
                style={{ width: "100%" }}
                onChange={handleChange}
                options={[
                  { value: "Laliga", label: "Laliga" },
                  { value: "not all", label: "not ALL" },
                ]}
                className={style.selector}
              />
            </Space>
          </div>
        </div>
      </div>

      {data?.DATA.map((el: any) => {
        return (
          <article className={` mb-6`} key={el.GROUP_ID}>
            <h4 className="font-semibold text-xl mb-3">{el.GROUP_LABEL}</h4>
            <div className={style.titles}>
              <p>#</p>
              <p>NAME</p>
              <p>AGE</p>
              <p>PLAY</p>
              <p>MIN</p>
              <p>G</p>
              <p>A</p>
              <p>Y</p>
              <p>R</p>
            </div>
            <div className={`${style.infoItemSection} `}>
              {el?.ITEMS.map((player: any) => {
                return (
                  <Player
                    key={player.PLAYER_ID}
                    id={player.PLAYER_ID}
                    name={player.PLAYER_NAME}
                    number={player.PLAYER_JERSEY_NUMBER}
                    image={player.PLAYER_IMAGE_PATH}
                    playerLength={playersArray}
                  />
                );
              })}
            </div>
          </article>
        );
      })}
    </article>
  );
};

export default PlayerStats;
