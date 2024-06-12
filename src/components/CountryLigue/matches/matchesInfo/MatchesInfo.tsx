"use client";
import React, { useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import MatchItem from "./matchItem/MatchItem";

const MatchesInfo = () => {
  const [activeLink, setActiveLink] = useState("OVERALL");

  const menu = [
    { title: "OVERALL", href: "#" },
    { title: "HOME", href: "#" },
    { title: "AWAY", href: "#" },
  ];
  return (
    <section className={`${style.info}`}>
      <ul className="flex items-center gap-x-2 pb-3 p-2">
        {menu.map((el, index) => (
          <li
            key={index}
            className={`${activeLink === el.title ? style.activeMenu : ""}`}
          >
            <Link href={el.href} onChange={() => setActiveLink(el.title)}>
              {el.title}
            </Link>
          </li>
        ))}
      </ul>
      <article>
        <div
          className={`${style.infoTableTitle} flex items-center  p-2 gap-x-2`}
        >
          <p className="flex items-center justify-center font-bold">
            #{" "}
            <svg
              width="6"
              height="4"
              viewBox="0 0 6 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-0.5"
            >
              <path d="M3 0L6 4H0L3 0Z" fill="#2E3E46" />
            </svg>
          </p>
          <p className="font-bold">TEAM</p>
          <p className="flex items-center justify-center font-normal">MP</p>
          <p className="flex items-center justify-center font-normal">W</p>
          <p className="flex items-center justify-center font-normal">D</p>
          <p className="flex items-center justify-center font-normal">L</p>
          <p className="flex items-center justify-center font-normal">G</p>
          <p className="flex items-center justify-center font-normal">GD</p>
          <p className="flex items-center justify-center font-bold">PTS</p>
          <p className="flex items-center justify-center font-normal">FORM</p>
        </div>
      </article>
      <MatchItem id={1} />
      <MatchItem id={2} />
      <MatchItem id={6} />
    </section>
  );
};

export default MatchesInfo;
