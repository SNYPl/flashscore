"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import TeamMatchInfo from "./teamInfo/TeamInfo";
import Nav from "./teamsMatchNavigation/TeamsMatchNavigation";
import Info from "./info/MatchInfo";
import LineUps from "./lineUps/LineUps";
import H2h from "./h2h/H2h";
import Table from "../CountryLigue/table/Table";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";

const MatchSection: React.FC = () => {
  const [activeMenu, setActiveSection] = useState("INFO");
  const searchParams = useSearchParams();

  const eventId = searchParams.get("id");

  const options = {
    method: "GET",
    url: "https://flashlive-sports.p.rapidapi.com/v1/events/data",
    params: {
      event_id: eventId,
      locale: "en_INT",
    },
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FLASHSCORE_API,
      "x-rapidapi-host": "flashlive-sports.p.rapidapi.com",
    },
  };

  const { data, isLoading, isError, isFetched } = useQuery(
    ["eventInfo", eventId],
    async () => {
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.error("Error fetching result events", error);
        throw new Error("Error fetching result events");
      }
    }
  );

  console.log(data);

  return (
    <section className={` flex flex-col `}>
      <TeamMatchInfo data={data?.DATA.EVENT} />
      <Nav activeMenu={activeMenu} setActiveSection={setActiveSection} />

      {activeMenu === "INFO" && <Info />}

      {/* {activeMenu === "TABLE" && <Table />} */}

      {activeMenu === "H2H" && <H2h />}

      {activeMenu === "LINE-UPS" && <LineUps />}

      <div className="p-3">
        <Image src="/images/ad/matchAd.png" alt="ad" width={658} height={100} />
      </div>
    </section>
  );
};

export default MatchSection;
