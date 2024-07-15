import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import axios from "axios";
import { Skeleton } from "antd";

const PlayerInfo = () => {
  const searchParams = useSearchParams();
  const playerId = searchParams.get("playerId");

  const sportId = searchParams.get("sportId");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/players/data",
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

  const { data, isLoading, isError, isFetched, isFetching } = useQuery(
    ["playerInfo", playerId, sportId],
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

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton />
      </div>
    );
  }
  function getAgeAndFormattedDate(timestamp: number): string {
    const birthDate = new Date(timestamp * 1000);

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    const day = birthDate.getDate().toString().padStart(2, "0");
    const month = (birthDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = birthDate.getFullYear();

    const formattedBirthDate = `${day}.${month}.${year}`;

    return ` ${age} (${formattedBirthDate})`;
  }
  function contractDateHandler(timestamp: number): string {
    const date = new Date(timestamp * 1000);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  const age = getAgeAndFormattedDate(data?.DATA.BIRTHDAY_TIME);
  const contractDate = contractDateHandler(data?.DATA.PCE);

  return (
    <section
      className={`${style.playerInfo}  w-full px-3 flex justify-between items-center`}
    >
      <div className="flex gap-x-4">
        <div className={style.img}>
          <Image
            src={data?.DATA.IMAGE_PATH}
            alt="player"
            width={72}
            height={72}
          />
        </div>
        <div className={`${style.info}`}>
          <h3 className="mb-1">{data?.DATA.NAME}</h3>
          <div>
            <p>
              {data?.DATA.TYPE_NAME}:<span>({data?.DATA.TEAM_NAME})</span>
            </p>
            <p>
              Age:<span>{age}</span>
            </p>
            <p>
              Market value:<span>{data?.DATA.PMV}</span>
            </p>
            <p>
              Contract expires:<span>{contractDate}</span>
            </p>
          </div>
        </div>
      </div>
      <div className={`${style.img}`}>
        <Image src={data?.DATA.TEAM_IMAGE} alt="team" width={72} height={72} />
      </div>
    </section>
  );
};

export default PlayerInfo;
