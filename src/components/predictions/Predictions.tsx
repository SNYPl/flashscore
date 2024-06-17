import React from "react";
import style from "./style.module.css";
import Prediction from "./prediction/Prediction";
import { PredictionStart } from "@/common/svg/home";
import Link from "next/link";
import Image from "next/image";

const Predictions = () => {
  const arr = [1, 2, 3];
  return (
    <section className={`${style.prediction}  w-full  `}>
      <article className={`${style.predictionItem} bg-white w-full  mb-4`}>
        <div className="mb-5 flex gap-x-1 items-center p-4 pb-0">
          <PredictionStart />
          <h3 className="text-prediction-color text-base  font-semibold">
            SPORT <span className="font-bold">PREDICTION</span>
          </h3>
        </div>
        <div className="p-4">
          {arr.map((el, id) => (
            <Prediction key={el} border={id == 1} />
          ))}
        </div>
        <div className={`${style.seeAlLink} `}>
          <Link href="#" className="text-prediction-team-title ">
            See All{" "}
          </Link>
        </div>
      </article>
      <article>
        <Image src="/images/ad/sideAd.png" width={252} height={450} alt="ad" />
      </article>
    </section>
  );
};

export default Predictions;
