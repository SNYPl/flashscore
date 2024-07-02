"use client";
import React, { useState } from "react";
import style from "./style.module.css";

const MatchesMenu = ({
  setApiMenuRequest,
  activeMenu,
  setActiveMenu,
}: {
  setApiMenuRequest: any;
  activeMenu: string;
  setActiveMenu: any;
}) => {
  const menu = [
    { title: "STANDINGS", api: "overall" },
    { title: "FORM", api: "form" },
    { title: "OVER/UNDER", api: "overall" },
    { title: "HT/FT", api: "overall" },
    { title: "TOP SCORES", api: "top_scores" },
  ];

  return (
    <section className={`${style.menu} mb-4`}>
      <ul className="flex items-center gap-x-2">
        {menu.map((el, index) => (
          <li
            key={index}
            className={`${activeMenu === el.title ? style.activeMenu : ""}`}
            onClick={() => {
              setActiveMenu(el.title);
              setApiMenuRequest(el.api);
            }}
          >
            <button>{el.title}</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MatchesMenu;
