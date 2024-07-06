"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import { Select, Space } from "antd";
import Player from "./player/Player";

const PlayerStats = () => {
  const [active, setActive] = useState("ALL");
  const menu = [
    "ALL",
    "GOALS",
    "ASSISTS",
    "SHOTS ON TARGET",
    "YELLOW CARDS",
    "RED CARDS",
  ];

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <article className={`${style.playerStats} bg-white rounded-lg p-4 `}>
      <div>
        <div className={`flex items-center mb-4 gap-x-3 ${style.nav}`}>
          {menu.map((el, id) => (
            <button
              className={`${active === el ? style.active : ""}`}
              onClick={() => setActive(el)}
              key={id}
            >
              {el}
            </button>
          ))}
        </div>
        <div>
          <div className="w-full mb-4">
            <Space wrap className={style.selector} style={{ width: "100%" }}>
              <Select
                defaultValue="Laliga"
                style={{ width: "100%" }}
                onChange={handleChange}
                options={[
                  { value: "Laliga", label: "Laliga" },
                  { value: "not all", label: "not ALL" },
                ]}
                className={style.selector}
              />
            </Space>
          </div>
        </div>
      </div>

      <article className={`${style.MatchInfoSection} mb-4`}>
        <h4 className="font-semibold text-sm mb-3">Goalkeepers</h4>
        <div className={style.titles}>
          <p>#</p>
          <p>NAME</p>
          <p>AGE</p>
          <p>PLAY</p>
          <p>MIN</p>
          <p>G</p>
          <p>A</p>
          <p>Y</p>
          <p>R</p>
        </div>
        <div className={`${style.infoItemSection} `}>
          <Player />
        </div>
      </article>
    </article>
  );
};

export default PlayerStats;
