"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import TeamMatchInfo from "./teamInfo/TeamInfo";
import Nav from "./teamsMatchNavigation/TeamsMatchNavigation";
import Info from "./info/MatchInfo";
import LineUps from "./lineUps/LineUps";
import H2h from "./h2h/H2h";
import MatchesInfo from "../CountryLigue/matches/matchesInfo/MatchesInfo";
import Image from "next/image";

const MatchSection: React.FC = () => {
  const [activeMenu, setActiveSection] = useState("INFO");
  return (
    <section className={` flex flex-col `}>
      <TeamMatchInfo />
      <Nav activeMenu={activeMenu} setActiveSection={setActiveSection} />

      {activeMenu === "INFO" && <Info />}

      {activeMenu === "TABLE" && <MatchesInfo />}

      {activeMenu === "H2H" && <H2h />}

      <div className="p-3">
        <Image src="/images/ad/matchAd.png" alt="ad" width={658} height={100} />
      </div>
    </section>
  );
};

export default MatchSection;
