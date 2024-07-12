import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface playerProps {
  id: string;
  name: string;
  image: string;
  number: number;
  playerEvents: any[];
}

const Player: React.FC<playerProps> = ({
  id,
  image,
  name,
  number,
  playerEvents,
}) => {
  const searchParams = useSearchParams();
  const sportId = searchParams.get("sportId");

  console.log(playerEvents);

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
