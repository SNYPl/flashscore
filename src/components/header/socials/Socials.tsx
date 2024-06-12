"use client";
import React, { useState } from "react";
import Link from "next/link";
import style from "./style.module.css";
import { Facebook, Twitter, Instagram, Email } from "@/common/svg/socials";
import Image from "next/image";
import { Modal } from "antd";
import { usePathname } from "next/navigation";

const socialArray = [
  { component: <Facebook />, w: 9, h: 15, alt: "fb", href: "" },
  { component: <Twitter />, w: 17, h: 15, alt: "tw", href: "" },
  { component: <Instagram />, w: 15, h: 15, alt: "inst", href: "" },
  { component: <Email />, w: 18, h: 15, alt: "email", href: "" },
];

const Socials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathName = usePathname();
  const matchRouteHandler = pathName.includes("match");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      className={`flex items-center justify-center gap-x-8 ${
        matchRouteHandler ? "hide" : ""
      }`}
    >
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
          onClick={showModal}
        />
        <Modal
          title=""
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          className={style.modal}
          classNames={{ content: style.modalBody }}
        >
          <article>
            <div className="flex justify-center items-center p-6">
              <Link href="#">
                <Image
                  src={"images/header/blitz/BLITZ.svg"}
                  alt="blitz"
                  width={87}
                  height={27}
                />
              </Link>
            </div>
            <article className={`${style.supportItems} flex`}>
              <div className={`${style.itemOne} flex`}>
                <div className="flex justify-center items-center p-6">
                  <Link href="#" target="_blank">
                    <Image
                      src={"images/header/blitz/INEWS.svg"}
                      alt="blitz"
                      width={101}
                      height={28}
                    />
                  </Link>
                </div>
                <div className="flex justify-center items-center p-6">
                  <Link href="#" target="_blank">
                    <Image
                      src={"images/header/blitz/FOTBALLNEWS.svg"}
                      alt="blitz"
                      width={145}
                      height={12}
                    />
                  </Link>
                </div>
              </div>
              <div className={` justify-center items-center  ${style.itemTwo}`}>
                <div className="flex justify-center items-center p-6">
                  <Link href="#" target="_blank">
                    <Image
                      src={"images/header/blitz/ISPORT.svg"}
                      alt="blitz"
                      width={100}
                      height={24}
                    />
                  </Link>
                </div>
                <div className="flex justify-center items-center p-6"></div>
              </div>
            </article>
          </article>
        </Modal>
      </div>
    </section>
  );
};

export default Socials;
