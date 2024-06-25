"use client";
import React, { useEffect } from "react";
import Logo from "./logo/Logo";
import style from "./style.module.css";
import Navigation from "./navigation/Navigation";
import Socials from "./socials/Socials";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setNavFixed } from "../store/slices/headerNavSlice";

const Header = () => {
  const pathName = usePathname();
  const matchRouteHandler = pathName.includes("match");
  const dispatch = useDispatch();
  const isNavFixed = useSelector(
    (state: any) => state.headerNavReducer.fixedNav
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 110) {
        dispatch(setNavFixed(true));
      } else {
        dispatch(setNavFixed(false));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className={`${style.header} ${
        matchRouteHandler ? "matchContainer" : ""
      }    w-full
      ${isNavFixed ? style.fixed : ""}  transition-3`}
    >
      <div className={`container flex justify-between items-center h-full`}>
        <Logo matchRouteHandler={matchRouteHandler} isNavFixed={isNavFixed} />
        <Navigation />
        <Socials isNavFixed={isNavFixed} />
      </div>
    </section>
  );
};

export default Header;
