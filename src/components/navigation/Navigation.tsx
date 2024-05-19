import React from "react";
import Nav from "./nav/Nav";
import Search from "./search/Search";
import style from "./nav/style.module.css";

const Navigation = () => {
  return (
    <section className={`  ${style.navContainer}`}>
      <div className={`container flex items-center justify-between h-16`}>
        <Nav />
        <Search />
      </div>
    </section>
  );
};

export default Navigation;
