import React from "react";
import Logo from "./logo/Logo";
import style from "./style.module.css";
import Navigation from "./navigation/Navigation";
import Socials from "./socials/Socials";

const Header = () => {
  return (
    <section className={`${style.header}   h-20 w-full`}>
      <div className="container flex justify-between items-center h-full">
        <Logo />
        <Navigation />
        <Socials />
      </div>
    </section>
  );
};

export default Header;
