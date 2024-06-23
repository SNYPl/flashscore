"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import { Select, Space } from "antd";
import MatchLeague from "@/components/allMatchInfoSection/leagueMatchlist/matchLeague/MatchLeague";

const ClubMatches = () => {
  const [active, setActive] = useState("FIXTURES");

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <article className={`${style.clubmatches} bg-white rounded-lg p-4`}>
      <div>
        <div className={`flex items-center mb-4 gap-x-3 ${style.nav}`}>
          <button
            className={`${active === "FIXTURES" ? style.active : ""}`}
            onClick={() => setActive("FIXTURES")}
          >
            FIXTURES
          </button>
          <button
            className={`${active === "RESULTS" ? style.active : ""}`}
            onClick={() => setActive("RESULTS")}
          >
            RESULTS
          </button>
        </div>
        <div className="w-full mb-4">
          <Space wrap className={style.selector} style={{ width: "100%" }}>
            <Select
              defaultValue="all"
              style={{ width: "100%" }}
              onChange={handleChange}
              options={[
                { value: "all", label: "All Competentions" },
                { value: "not all", label: "not ALL" },
              ]}
              className={style.selector}
            />
          </Space>
        </div>
      </div>

      <div>{/* <MatchLeague /> */}</div>
    </article>
  );
};

export default ClubMatches;
