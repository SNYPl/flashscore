import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";

const supportImages = [
  {
    src: "/images/footer/support2.png",
    alt: "support-1",
    width: 80,
    height: 22,
  },
  {
    src: "/images/footer/support5.svg",
    alt: "support-2",
    width: 90,
    height: 22,
  },
  {
    src: "/images/footer/support3.svg",
    alt: "support-3",
    width: 90,
    height: 22,
  },
  {
    src: "/images/footer/support4.png",
    alt: "support-4",
    width: 145,
    height: 13,
  },
];

const Support = () => {
  return (
    <section
      className={`${style.support} w-full flex gap-x-9 items-center mt-7 container`}
    >
      <div className={`${style.logoImgContainer}`}>
        <Link href={"#"}>
          <Image
            src={"/images/footer/blitz.svg"}
            alt={"logo"}
            width={95}
            height={30}
            key={"blitzIcon"}
            // className="object-contain"
          />
        </Link>
      </div>

      {supportImages.map((el, id) => (
        <Link href={"#"}>
          <Image
            src={el.src}
            alt={el.alt}
            width={el.width}
            height={el.height}
            key={id}
            // className="object-contain"
          />
        </Link>
      ))}
    </section>
  );
};

export default Support;
