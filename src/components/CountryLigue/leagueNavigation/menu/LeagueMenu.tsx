"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";

const LeagueMenu = ({
  setActiveMenu,
  activeMenu,
}: {
  activeMenu: string;
  setActiveMenu: any;
}) => {
  const menu = ["SUMMARY", "RESULTS", "FIXTURES", "STANDINGS"];
  return (
    <section className={`${style.LeagueMenu} p-4`}>
      <ul className="flex items-center gap-x-4">
        {menu.map((el, index) => (
          <li key={index}>
            <button
              className={activeMenu === el ? style.active : ""}
              onClick={() => setActiveMenu(el)}
            >
              {el}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LeagueMenu;
