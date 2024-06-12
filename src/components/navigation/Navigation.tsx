"use client";
import React from "react";
import Nav from "./nav/Nav";
import Search from "./search/Search";
import style from "./nav/style.module.css";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathName = usePathname();
  const matchRouteHandler = pathName.includes("match");
  return (
    <section
      className={`  ${style.navContainer} ${matchRouteHandler ? "hide" : ""}`}
    >
      <div className={`container flex items-center justify-between h-16`}>
        <Nav />
        <Search />
      </div>
    </section>
  );
};

export default Navigation;
