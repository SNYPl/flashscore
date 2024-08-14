import React from "react";
import style from "./style.module.css";
import Link from "next/link";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";

interface draw {
  homeNumber: string;
  homeResuls: string;
  homeName: string;
  homeSide: string;
  awayNumber: string;
  awayResuls: string;
  awayName: string;
  awaySide: string;
  eventId: string;
}

const DrawItem: React.FC<draw> = ({
  awayName,
  awayNumber,
  awayResuls,
  awaySide,
  homeName,
  homeNumber,
  homeResuls,
  homeSide,
  eventId,
}) => {
  const sportId = useSportIdHandler();

  return (
    <div className={`${style.draw}  flex flex-col justify-between`}>
      <Link
        href={`${sportId?.href}/match/event?id=${eventId}`}
        target="_blank"
        onClick={(e: any) => {
          if (!eventId) e.preventDefault();
        }}
      >
        <div
          className={`${style.drawPlayers}`}
          style={{ cursor: !eventId ? "not-allowed" : "pointer" }}
        >
          {homeName && (
            <div className={`${style.homePlayer}`}>
              <span className="mr-1">({homeSide})</span>

              {homeName}
            </div>
          )}
          <div className={`${style.homeScore}`}>{homeResuls}</div>
          {awayName && (
            <div className={`${style.awayPlayer}`}>
              <span className="mr-1">({awaySide})</span>

              {awayName}
            </div>
          )}
          <div className={`${style.awayScore}`}>{awayResuls}</div>
        </div>
      </Link>
    </div>
  );
};

export default DrawItem;
