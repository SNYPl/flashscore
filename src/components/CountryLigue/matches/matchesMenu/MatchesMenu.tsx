"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";

const MatchesMenu = () => {
  const [activeMenu, setActiveMenu] = useState("STANDINGS");
  const menu = [
    { title: "STANDINGS", href: "/" },
    { title: "FORUM", href: "/" },
    { title: "OVER/UNDER", href: "/" },
    { title: "HT/FT", href: "/" },
    { title: "TOP SCORES", href: "/" },
  ];
  return (
    <section className={`${style.menu} mb-4`}>
      <ul className="flex items-center gap-x-2">
        {menu.map((el, index) => (
          <li
            key={index}
            className={`${activeMenu === el.title ? style.activeMenu : ""}`}
            onChange={() => setActiveMenu(el.title)}
          >
            <Link href={el.href} className="">
              {el.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MatchesMenu;
