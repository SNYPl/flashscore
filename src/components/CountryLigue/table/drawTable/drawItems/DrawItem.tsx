import React from "react";
import style from "./style.module.css";

const DrawItem = ({}: {}) => {
  return (
    <article
      className={`${style.drawItem} mt-4 flex flex-rows justify-between`}
    ></article>
  );
};

export default DrawItem;
