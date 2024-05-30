"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";

const LeagueMenu = () => {
  const [activeMenu, setActiveMenu] = useState("SUMMARY");

  const menu = [
    { title: "SUMMARY", href: "/" },
    { title: "RESULTS", href: "/" },
    { title: "FIXTURES", href: "/" },
    { title: "STANDINGS", href: "/" },
  ];
  return (
    <section className={`${style.LeagueMenu} p-4`}>
      <ul className="flex items-center gap-x-4">
        {menu.map((el, index) => (
          <li key={index}>
            <Link
              href={el.href}
              className={activeMenu === el.title ? style.active : ""}
            >
              {el.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LeagueMenu;
