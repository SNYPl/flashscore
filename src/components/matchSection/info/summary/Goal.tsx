import React from "react";
import style from "./style.module.css";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import Link from "next/link";
import { IoFootballOutline } from "react-icons/io5";

const Goal = ({
  type,
  time,
  id,
  name,
  incidentName,
  awayScore,
  homeScore,
  stageName,
}: {
  type: string;
  time: string;
  id: string;
  name: string;
  incidentName: string;
  awayScore?: string;
  homeScore?: string;
  stageName: string;
}) => {
  const sportId = useSportIdHandler();
  return (
    <div className={`${style.incidentItem} flex items-center gap-x-2`}>
      {type === "GOAL" && <p className={style.incidentTime}>{time}</p>}

      {type === "GOAL" && (
        <div className="flex items-center gap-x-2">
          <div className={`${style.card} gap-x-1`}>
            <IoFootballOutline />
            {stageName !== "Penalties" && (
              <div className={style.penaltyScored}>
                {homeScore}-{awayScore}
              </div>
            )}
          </div>
        </div>
      )}

      <Link
        href={`/player/${name}?playerId=${id}&sportId=${sportId?.id}`}
        className="flex items-center"
        style={{
          fontSize: type === "ASSISTANCE" ? "10.5px" : "13px",
          color: type === "ASSISTANCE" ? "#555e61" : "",
          fontWeight: type === "ASSISTANCE" ? "400" : "700",
        }}
      >
        {name}
      </Link>
    </div>
  );
};

export default Goal;
