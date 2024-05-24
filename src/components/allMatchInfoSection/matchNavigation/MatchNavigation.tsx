"use client";
import React, { useState } from "react";
import style from "./style.module.css";

const MatchNavigation = () => {
  const [selected, setSelected] = useState("ALL");

  const filterLinks = [
    { title: "ALL", name: "all" },
    { title: "LIVE", name: "live" },
    { title: "ODDS", name: "odds" },
    { title: "FINISHED", name: "finished" },
    { title: "SCHEDULED", name: "scheduled" },
  ];
  return (
    <section className={`flex items-center gap-x-2 mt-3`}>
      {filterLinks.map((el, id) => (
        <div
          className={`${
            selected === el.title ? style.selected : ""
          } cursor-pointer ${style.navLink}`}
          onClick={() => setSelected(el.title)}
          key={id}
        >
          <p>{el.title}</p>
        </div>
      ))}
    </section>
  );
};

export default MatchNavigation;
