"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import style from "./style.module.css";
import { usePathname } from "next/navigation";
import {
  FootballIcon,
  TennisIcon,
  FavouriteIcon,
  HockeyIcon,
  BasketballIcon,
} from "@/common/svg/navigation";

const nav = [
  {
    img: <FootballIcon />,
    alt: "/",
    w: 20,
    h: 20,
    href: "/",
    text: "FOOTBALL",
  },
  {
    img: <TennisIcon />,
    alt: "/tennis",
    w: 19,
    h: 19,
    href: "tennis",
    text: "TENNIS",
  },
  {
    img: <BasketballIcon />,
    alt: "/basketball",
    w: 18,
    h: 18,
    href: "basketball",
    text: "BASKETBALL",
  },
  {
    img: <HockeyIcon />,
    alt: "/hockey",
    w: 18,
    h: 18,
    href: "hockey",
    text: "HOCKEY",
  },
];

const Nav = () => {
  const pathName = usePathname();

  return (
    <article className={"flex items-center h-full"}>
      <div className="mr-9 flex justify-center items-center h-full">
        <Link
          href={"/favorites"}
          className={`flex justify-center items-center gap-x-2 ${
            style.linkItem
          } ${pathName === "/favorites" ? style.active : ""} `}
        >
          <Image src={"/images/nav/fav.svg"} width={21} height={20} alt="fav" />
          <h4>FAVORITES</h4>
          <span>0</span>
        </Link>
      </div>
      {nav.map((el, id) => (
        <div className="mr-9 flex justify-center items-center h-full" key={id}>
          <Link
            href={el.href}
            className={`flex justify-center items-center gap-x-2 h-full ${
              style.linkItem
            } ${pathName === el.alt ? style.active : ""}`}
          >
            {el.img}
            <h4>{el.text}</h4>
          </Link>
        </div>
      ))}
    </article>
  );
};

export default Nav;
