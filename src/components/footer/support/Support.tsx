"use client";
import React from "react";
import style from "./style.module.css";
import Image from "next/image";

const supportImages = [
  {
    src: "/images/footer/support1.png",
    alt: "support-1",
    width: 150,
    height: 65,
  },
  {
    src: "/images/footer/support2.png",
    alt: "support-1",
    width: 94,
    height: 26,
  },
  {
    src: "/images/footer/support3.png",
    alt: "support-1",
    width: 167,
    height: 55,
  },
  {
    src: "/images/footer/support4.png",
    alt: "support-1",
    width: 180,
    height: 15,
  },
];

const Support = () => {
  return (
    <section
      className={`${style.support} w-full flex gap-x-9 items-center mt-7`}
    >
      {supportImages.map((el, id) => (
        <Image
          src={el.src}
          alt={el.alt}
          width={el.width}
          height={el.height}
          key={id}
          // className="object-contain"
        />
      ))}
    </section>
  );
};

export default Support;
