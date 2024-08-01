import React from "react";
import style from "./style.module.css";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import Link from "next/link";
import { PiUserCircleDashedFill } from "react-icons/pi";
import { IoPeopleCircleOutline } from "react-icons/io5";

const Substition = ({
  type,
  time,
  id,
  name,
}: {
  type: string;
  time: string;
  id: string;
  name: string;
}) => {
  const sportId = useSportIdHandler();
  return (
    <div className={`${style.incidentItem} flex items-center gap-x-2`}>
      {type === "SUBSTITUTION_OUT" && (
        <p className={style.incidentTime}>{time}</p>
      )}
      {type === "SUBSTITUTION_OUT" && (
        <div className={`${style.card} `}>
          <IoPeopleCircleOutline />
        </div>
      )}
      <Link
        href={`/player/${name}?playerId=${id}&sportId=${sportId?.id}`}
        className="flex items-center"
        style={{
          fontSize: type === "SUBSTITUTION_IN" ? "10.5px" : "13px",
          color: type === "SUBSTITUTION_IN" ? "#555e61" : "",
          fontWeight: type === "SUBSTITUTION_IN" ? "400" : "700",
        }}
      >
        {name}
      </Link>
    </div>
  );
};

export default Substition;
