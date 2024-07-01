import React from "react";
import style from "./style.module.css";
import { FlagIcon } from "@/common/svg/flag";
import Link from "next/link";
import Image from "next/image";

interface matchProps {
  id: number;
  name: string;
  mp: number;
  wins: number;
  goals: string;
  points: string;
  rank: number;
  image: string;
}

const MatchItem: React.FC<matchProps> = ({
  id,
  name,
  mp,
  wins,
  goals,
  points,
  rank,
  image,
}) => {
  const [num1, num2] = goals.split(":");
  const goalDifferences = Math.abs(Number(num1) - Number(num2));

  const pointsPerWin = 3;
  const pointsPerDraw = 1;

  const pointsFromWins = wins * pointsPerWin;
  const pointsFromDraws = Number(points) - pointsFromWins;
  const draws = pointsFromDraws / pointsPerDraw;
  const losses = mp - (wins + draws);

  return (
    <div className={`${style.matchItem} p-2  gap-x-2`}>
      <div
        className={`${rank < 6 ? style.numColor : ""} ${
          rank === 6 ? style.numColorYellow : ""
        } flex justify-center items-center`}
      >
        <p
          className={`${style.num}  flex justify-start items-center font-bold`}
        >
          {rank}.
        </p>
      </div>
      <div className="flex justify-start items-center font-bold gap-x-2">
        <Image src={image} alt="flag" width={20} height={20} />
        <Link href={"/team/arsenal"} className={style.teamLink}>
          {name}
        </Link>
      </div>
      <p className="flex items-center justify-center font-normal">{mp}</p>
      <p className="flex items-center justify-center font-normal">{wins}</p>
      <p className="flex items-center justify-center font-normal">{draws}</p>
      <p className="flex items-center justify-center font-normal">{losses}</p>
      <p className="flex justify-center items-center font-normal">{goals}</p>
      <p className="flex items-center justify-center">{goalDifferences}</p>
      <p className="flex items-center justify-center font-bold">{points}</p>
      <div className={` items-center font-normal ${style.tableWords} gap-x-1`}>
        <p style={{ backgroundColor: "#C8CDCD" }}>?</p>
        <p className={style.greenColor}>W</p>
        <p className={style.yellowColor}>D</p>
        <p className={style.greenColor}>W</p>
        <p className={style.redColor}>L</p>
      </div>
    </div>
  );
};

export default MatchItem;
