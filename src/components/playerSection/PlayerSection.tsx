"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import PlayerInfo from "./playerInfo/PlayerInfo";
import Table from "../CountryLigue/table/Table";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import { Skeleton } from "antd";
import ParamInfo from "../paramInfo/ParamInfo";
import LastPlayerEvents from "./lastPlayerMatches/LastPlayerMatches";

const PlayerSection: React.FC = () => {
  const searchParams = useSearchParams();

  const PlayerId = searchParams.get("id");

  // if (isLoading ) {
  //   return (
  //     <div className="p-4">
  //       <Skeleton />
  //     </div>
  //   );
  // }

  return (
    <section className={`${style.playerSection} flex flex-col  `}>
      <div className=" p-4">
        <div className="bg-white rounded-lg p-4 mb-3">
          {" "}
          <ParamInfo />
          <PlayerInfo />
        </div>

        <LastPlayerEvents />

        <div className="bg-white rounded-lg p-4">
          <Image
            src="/images/ad/matchAd.png"
            alt="ad"
            width={658}
            height={100}
          />
        </div>
      </div>
    </section>
  );
};

export default PlayerSection;
