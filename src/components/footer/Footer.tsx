import React from "react";
import style from "./style.module.css";
import FooterMenu from "./footerMenu/FooterMenu";
import Support from "./support/Support";
import Copyright from "./copyright/Copyright";

const Footer = () => {
  const menuItem = [
    "Football news",
    "Premier league",
    "Fa sports",
    "SERIES A",
    "Bundesliga",
  ];
  return (
    <section className={`${style.footer}  mt-5 bg-white pt-9`}>
      <div className={`flex gap-x-6 ${style.footerItem} container`}>
        <FooterMenu title={"FOOTBALL"} menuItems={menuItem} />{" "}
        <FooterMenu title={"TENNIS"} menuItems={menuItem} />
      </div>
      <Support />
      <Copyright />
    </section>
  );
};

export default Footer;
