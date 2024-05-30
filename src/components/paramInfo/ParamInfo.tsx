"use client";

import React from "react";
import style from "./style.module.css";
import { usePathname } from "next/navigation";

const ParamInfo: React.FC = () => {
  const path = usePathname();
  const pathArray = path.split("/").filter((el) => el);

  return (
    <section className={`${style.info}`}>
      <i className="fa-solid fa-house-chimney"></i>

      <p className={`${style.addedParams}`}>
        {pathArray.map((el: any, id: number) => (
          <React.Fragment key={el}>
            <span>{el.toUpperCase()}</span>
            {id !== pathArray.length - 1 ? (
              <span className={`${style.paramArrow}`}>{">"}</span>
            ) : (
              ""
            )}
          </React.Fragment>
        ))}
      </p>
    </section>
  );
};

export default ParamInfo;
