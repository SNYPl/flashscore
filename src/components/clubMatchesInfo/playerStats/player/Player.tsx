import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import Link from "next/link";

interface playerProps {
  id: string;
  name: string;
  image: string;
  number: number;
  playerLength: any[];
}

const Player: React.FC<playerProps> = ({
  id,
  image,
  name,
  number,
  playerLength,
}) => {
  const searchParams = useSearchParams();
  const sportId = searchParams.get("sportId");
  const queryClient = useQueryClient();

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/players/last-events",
    params: {
      sport_id: sportId,
      locale: "en_INT",
      player_id: id,
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  // const { data, isLoading, isError, isFetched, isFetching } = useQuery(
  //   ["playerLastEvents", id, sportId],
  //   async () => {
  //     try {
  //       const response = await axios.request(options);
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error fetching result events", error);
  //       throw new Error("Error fetching result events");
  //     }
  //   },
  //   {
  //     retry: false,
  //     enabled: !!id,
  //   }
  // );

  // for (let i: number = 0; i >= playersArray.length; i++) {
  //     console.log(i);

  //     if (i % 5 === 0) {
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //     }
  //   }

  return (
    <div
      className={` ${style.infoItem} flex items-center justify-between p-4 mb-4`}
    >
      <p className={`${style.infoIndex} font-semibold`}>{number}</p>
      <div className=" flex items-center">
        <span className={`${style.infoIcon} mr-2`}>
          <Image src={image} width={20} height={20} alt="player" />
        </span>
        <Link href={`/player/${name}/?playerId=${id}&sportId=${sportId}`}>
          <h3 className={`${style.infoTitle} font-semibold `}>{name}</h3>
        </Link>
      </div>
      <p className={`${style.infoNumber} font-semibold `}>32</p>
      <p className={`${style.infoNumber} font-semibold `}>3</p>
      <p className={`${style.infoNumber} font-semibold `}>90</p>
      <p className={`${style.infoNumber} font-semibold `}>0</p>
      <p className={`${style.infoNumber} font-semibold `}>0</p>
      <p className={`${style.infoNumber} font-semibold `}>0</p>
      <p className={`${style.infoNumber} font-semibold `}>0</p>
    </div>
  );
};

export default Player;
