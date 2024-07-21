"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import style from "./style.module.css";
import { usePathname, useSearchParams } from "next/navigation";

import { setSportIdUpdated } from "@/components/store/slices/navSlice";
import { useDispatch } from "react-redux";
import { sportNavigation } from "@/lib/sportNavigation";
import { useSportIdHandler } from "@/components/hooks/useSportIdHandler";
import { useFavouriteLeagues } from "@/components/hooks/useFavouriteLeagues ";

const Nav = () => {
  const pathName = usePathname();
  const dispatch = useDispatch();
  const sportId = useSportIdHandler();
  const searchParams = useSearchParams();
  const sportSearchId = searchParams.get("sportId");
  const { favouriteLeagues } = useFavouriteLeagues();

  return (
    <article className={`flex items-center h-full ${style.nav}`}>
      <div className="mr-9 flex justify-center items-center h-full">
        <Link
          href={"/favorites"}
          className={`flex justify-center items-center gap-x-2  h-full ${
            style.linkItem
          } ${pathName === "/favorites" ? style.active : ""} `}
        >
          <Image src={"/images/nav/fav.svg"} width={21} height={20} alt="fav" />
          <h4>FAVORITES</h4>
          <span>{favouriteLeagues.length}</span>
        </Link>
      </div>
      {sportNavigation.map((el, id) => {
        const defaultMenuITem = pathName === "/" && el.alt === "/football";
        return (
          <div
            className="mr-9 flex justify-center items-center h-full"
            key={id}
          >
            <Link
              href={el.href}
              className={`flex justify-center items-center gap-x-2 h-full ${
                style.linkItem
              } ${
                sportId?.alt === el.alt || sportSearchId === el.id
                  ? style.active
                  : ""
              } ${defaultMenuITem ? style.active : ""}`}
              onClick={() => {
                dispatch(setSportIdUpdated(el.id));
              }}
            >
              {el.img}
              <h4>{el.text}</h4>
            </Link>
          </div>
        );
      })}
    </article>
  );
};

export default Nav;
