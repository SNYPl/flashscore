"use client";
import React from "react";
import Logo from "./logo/Logo";
import style from "./style.module.css";
import Navigation from "./navigation/Navigation";
import Socials from "./socials/Socials";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();
  const matchRouteHandler = pathName.includes("match");

  return (
    <section
      className={`${style.header} ${
        matchRouteHandler ? "matchContainer" : ""
      }   h-20 w-full`}
    >
      <div className={`container flex justify-between items-center h-full`}>
        <Logo matchRouteHandler={matchRouteHandler} />
        <Navigation />
        <Socials />
      </div>
    </section>
  );
};

export default Header;
