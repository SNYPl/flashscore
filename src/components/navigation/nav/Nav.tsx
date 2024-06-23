"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import style from "./style.module.css";
import { usePathname } from "next/navigation";

import { setSportIdUpdated } from "@/components/store/slices/navSlice";
import { useDispatch } from "react-redux";
import { sportNavigation } from "@/lib/sportNavigation";

const Nav = () => {
  const pathName = usePathname();
  const dispatch = useDispatch();

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
      {sportNavigation.map((el, id) => (
        <div className="mr-9 flex justify-center items-center h-full" key={id}>
          <Link
            href={el.href}
            className={`flex justify-center items-center gap-x-2 h-full ${
              style.linkItem
            } ${pathName === el.alt ? style.active : ""}`}
            onClick={() => {
              dispatch(setSportIdUpdated(el.id));
            }}
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
