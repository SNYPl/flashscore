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
    <article className={`${style.clubmatches} bg-white rounded-lg`}>
      <div>
        <div>
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
        <div>
          <Space wrap>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "all", label: "All Competentions" },
                { value: "not all", label: "not ALL" },
              ]}
            />
          </Space>
        </div>
      </div>

      <div>
        <MatchLeague />
      </div>
    </article>
  );
};

export default ClubMatches;
