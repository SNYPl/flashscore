import React from "react";
import style from "./style.module.css";
import ParamInfo from "@/components/paramInfo/ParamInfo";
import Image from "next/image";
import Link from "next/link";

type infoProps = {
  setActiveSection: (section: string) => void;
  activeMenu: string;
};

const ClubInfo: React.FC<infoProps> = ({ setActiveSection, activeMenu }) => {
  const menu = [
    { title: "MATCHES", href: "#" },
    { title: "PLAYER STATS", href: "#" },
  ];

  return (
    <article className={`${style.clubInfo} bg-white rounded-lg `}>
      <div className="  mb-7">
        <div className="p-4 pb-0">
          <ParamInfo />
          <section className={`${style.leagueTitle} flex  items-center`}>
            <div className={style.img}>
              <Image
                src={"/images/leagueMiddle/leagueImg.png"}
                alt="img"
                width={60}
                height={60}
              />
            </div>

            <div className={style.title}>
              <h3 className="flex items-center gap-x-4">Real Madrid </h3>
              <p>Stadium: Estadio Santiago Bernabéu (Madrid)</p>
            </div>
          </section>
        </div>
        <section className={`${style.clubMenu} p-4`}>
          <ul className="flex items-center gap-x-4">
            {menu.map((el, index) => (
              <li key={index} onClick={() => setActiveSection("el.title")}>
                <Link
                  href={el.href}
                  className={activeMenu === el.title ? style.active : ""}
                >
                  {el.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
};

export default ClubInfo;
