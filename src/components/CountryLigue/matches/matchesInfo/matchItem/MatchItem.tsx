import React from "react";
import style from "./style.module.css";
import { FlagIcon } from "@/common/svg/flag";

interface matchProps {
  id: number;
}

const MatchItem: React.FC<matchProps> = ({ id }) => {
  return (
    <div className={`${style.matchItem} p-2  gap-x-2`}>
      <div
        className={`${id < 6 ? style.numColor : ""} ${
          id === 6 ? style.numColorYellow : ""
        } flex justify-center items-center`}
      >
        <p
          className={`${style.num}  flex justify-start items-center font-bold`}
        >
          {id}.
        </p>
      </div>
      <div className="flex justify-start items-center font-bold gap-x-2">
        <FlagIcon /> <h2>Arsenal</h2>
      </div>
      <p className="flex items-center justify-center font-normal">37</p>
      <p className="flex items-center justify-center font-normal">27</p>
      <p className="flex items-center justify-center font-normal">5</p>
      <p className="flex items-center justify-center font-normal">5</p>
      <p className="flex justify-center items-center font-normal">89:28</p>
      <p className="flex items-center justify-center">61</p>
      <p className="flex items-center justify-center font-bold">86</p>
      <div className={` items-center font-normal ${style.tableWords} gap-x-1`}>
        <p style={{ backgroundColor: "#C8CDCD" }}>?</p>
        <p className={style.greenColor}>W</p>
        <p className={style.yellowColor}>D</p>
        <p className={style.greenColor}>W</p>
        <p className={style.redColor}>L</p>
      </div>
    </div>
  );
};

export default MatchItem;
