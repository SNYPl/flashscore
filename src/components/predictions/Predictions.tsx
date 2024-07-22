"use client";
import React from "react";
import style from "./style.module.css";
import Prediction from "./prediction/Prediction";
import { PredictionStart } from "@/common/svg/home";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

import { FreeMode } from "swiper/modules";

const Predictions = () => {
  const arr = [1, 2, 3];
  return (
    <section className={`${style.prediction}  w-full  `}>
      <article className={`${style.predictionItem} bg-white w-full  mb-4`}>
        <div className="mb-5 flex gap-x-1 items-center p-4 pb-0 mobileNone">
          <PredictionStart />
          <h3 className="text-prediction-color text-base  font-semibold">
            SPORT <span className="font-bold">PREDICTION</span>
          </h3>
        </div>
        <div className={`p-4 ${style.predictionList}`}>
          {arr.map((el, id) => (
            <div className="mb-3 " key={id}>
              <Image
                src="/images/prediction.jfif"
                alt="prediction"
                width={220}
                height={200}
              />
            </div>
          ))}
        </div>

        <div className={`${style.seeAlLink} mobileNone`}>
          <Link href="#" className="text-prediction-team-title ">
            See All{" "}
          </Link>
        </div>
      </article>
      <article className={style.adImgSection}>
        <Image
          src="/images/ad/sideAd.png "
          width={272}
          height={100}
          alt="ad"
          className="mobileNone"
        />
        <Image
          src="/images/ad/sideAd2.png"
          width={400}
          height={100}
          alt="ad"
          className="w-full desktopNo h-full"
        />
      </article>
    </section>
  );
};

export default Predictions;
