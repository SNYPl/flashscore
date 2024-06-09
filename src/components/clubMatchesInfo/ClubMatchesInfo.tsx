"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import ClubInfo from "./clubInfo/ClubInfo";
import ClubMatches from "./clubMatches/ClubMatches";
import PlayerStats from "./playerStats/PlayerStats";

const ClubMatchesInfo = () => {
  const [activeSection, setActiveSection] = useState<string>("MATCHES");
  return (
    <section className={`${style.clubMatches} `}>
      <ClubInfo
        setActiveSection={setActiveSection}
        activeMenu={activeSection}
      />

      {activeSection === "MATCHES" && <ClubMatches />}
      {activeSection === "PLAYER STATS" && <PlayerStats />}
    </section>
  );
};

export default ClubMatchesInfo;
