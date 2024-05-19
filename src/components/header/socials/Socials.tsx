import React from "react";
import Link from "next/link";
import style from "./style.module.css";
import { Facebook, Twitter, Instagram, Email } from "@/common/svg/socials";
import Image from "next/image";

const socialArray = [
  { component: <Facebook />, w: 9, h: 15, alt: "fb", href: "" },
  { component: <Twitter />, w: 17, h: 15, alt: "tw", href: "" },
  { component: <Instagram />, w: 15, h: 15, alt: "inst", href: "" },
  { component: <Email />, w: 18, h: 15, alt: "email", href: "" },
];

const Socials = () => {
  return (
    <section className={"flex items-center justify-center gap-x-8"}>
      <div
        className={`flex justify-between items-center gap-x-5 ${style.socialItems}`}
      >
        {socialArray.map((el, id) => (
          <Link href={el.href} key={id} target="_blank">
            {el.component}
          </Link>
        ))}
      </div>
      <div className={style.blitz}>
        <Image
          src="/images/header/blitz.svg"
          alt="blitz"
          width={60}
          height={20}
        />
      </div>
    </section>
  );
};

export default Socials;
