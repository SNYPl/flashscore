"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";

type infoProps = {
  setActiveSection: (section: string) => void;
  activeMenu: string;
};

const TeamsMatchNavigation: React.FC<infoProps> = ({
  setActiveSection,
  activeMenu,
}) => {
  const menu = [
    { title: "INFO", href: "#" },
    { title: "LINE-UPS", href: "#" },
    { title: "TABLE", href: "#" },
    { title: "H2H", href: "#" },
  ];

  return (
    <section className={`${style.clubMenu} p-4`}>
      <ul className="flex items-center gap-x-4">
        {menu.map((el, index) => (
          <li key={index} onClick={() => setActiveSection(el.title)}>
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

export default TeamsMatchNavigation;
