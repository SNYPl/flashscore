"use client";
import React from "react";
import style from "./style.module.css";
import DrawItem from "./drawItems/DrawItem";

interface tableProps {}

const DrawTable: React.FC<tableProps> = ({}) => {
  // if (!data?.DATA?.length) {
  //   return (
  //     <div>
  //       <p style={{ color: "var(--black-color)" }}>There is no information</p>
  //     </div>
  //   );
  // }

  return (
    <section className={`${style.info}`}>
      <div className={style.tableWrapper}>
        <article>
          <div>
            <div
              className={`${style.infoTableTitle} flex items-center  p-2 gap-x-2`}
            >
              <p className="font-bold">{"group"}</p>
              <p className="flex items-center justify-center font-normal">MP</p>
              <p className="flex items-center justify-center font-normal">W</p>
              <p className="flex items-center justify-center font-normal">D</p>
              <p className="flex items-center justify-center font-normal">L</p>
              <p className="flex items-center justify-center font-normal">G</p>
              <p className="flex items-center justify-center font-normal">GD</p>
              <p className="flex items-center justify-center font-bold">PTS</p>
            </div>
          </div>

          <DrawItem />
        </article>
      </div>
    </section>
  );
};

export default DrawTable;
