"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import style from "./style.module.css";
import UserLists from "@/components/userLists/UserLists";
import Link from "next/link";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "@/components/store/ThemeContext";
import { useRouter, usePathname } from "next/navigation";

const socialArray = [
  { component: "1", w: 9, h: 15, alt: "fb", href: "" },
  { component: "2", w: 17, h: 15, alt: "tw", href: "" },
  { component: "3", w: 15, h: 15, alt: "inst", href: "" },
  { component: "4", w: 18, h: 15, alt: "email", href: "" },
];

const MobileBurgerCotnent = () => {
  const [open, setOpen] = useState(false);
  const { mode, toggleDarkMode } = useTheme();
  const path = usePathname();

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <section className={`desktopNo `}>
      <div className={`${style.burgerMenu}`} onClick={() => setOpen(true)}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 17.5C20.3852 17.5002 20.7556 17.6486 21.0344 17.9144C21.3132 18.1802 21.479 18.5431 21.4975 18.9279C21.516 19.3127 21.3858 19.6898 21.1338 19.9812C20.8818 20.2726 20.5274 20.4558 20.144 20.493L20 20.5H4C3.61478 20.4998 3.24441 20.3514 2.96561 20.0856C2.68682 19.8198 2.52099 19.4569 2.50248 19.0721C2.48396 18.6873 2.61419 18.3102 2.86618 18.0188C3.11816 17.7274 3.47258 17.5442 3.856 17.507L4 17.5H20ZM20 10.5C20.3978 10.5 20.7794 10.658 21.0607 10.9393C21.342 11.2206 21.5 11.6022 21.5 12C21.5 12.3978 21.342 12.7794 21.0607 13.0607C20.7794 13.342 20.3978 13.5 20 13.5H4C3.60218 13.5 3.22064 13.342 2.93934 13.0607C2.65804 12.7794 2.5 12.3978 2.5 12C2.5 11.6022 2.65804 11.2206 2.93934 10.9393C3.22064 10.658 3.60218 10.5 4 10.5H20ZM20 3.5C20.3978 3.5 20.7794 3.65804 21.0607 3.93934C21.342 4.22064 21.5 4.60218 21.5 5C21.5 5.39782 21.342 5.77936 21.0607 6.06066C20.7794 6.34196 20.3978 6.5 20 6.5H4C3.60218 6.5 3.22064 6.34196 2.93934 6.06066C2.65804 5.77936 2.5 5.39782 2.5 5C2.5 4.60218 2.65804 4.22064 2.93934 3.93934C3.22064 3.65804 3.60218 3.5 4 3.5H20Z"
            fill="#7BA4B1"
          />
        </svg>
      </div>

      <Modal
        title="User Section"
        open={open}
        onCancel={handleCancel}
        footer={false}
        classNames={{ content: style.modalContent, header: style.modalHeader }}
      >
        <section className="bg-white">
          <div className={`${style.settings}`}>
            {/* <div className="flex justify-between mb-7">
              <div className="flex gap-x-4">
                <SettingIcon />
                <p>Settings</p>
              </div>
              <ArrrowIcon />
            </div> */}
            <div className="flex justify-between ">
              <div className="flex gap-x-4">
                <p>Dark mode</p>
              </div>
              <div className="cursor-pointer flex justify-center items-center ">
                <DarkModeSwitch
                  checked={mode === "dark"}
                  onChange={toggleDarkMode}
                  size={24}
                  moonColor="#F6F1D5"
                  sunColor="#FDB813"
                />
              </div>
            </div>
          </div>

          <div className={`${style.contact} mt-10`}>
            <div className={`${style.contactTitle} `}>
              <h4>Contact</h4>
            </div>

            <div
              className={`flex justify-between items-center gap-x-4 ${style.socialItems}`}
            >
              {socialArray.map((el, id) => (
                <Link href={el.href} key={id} target="_blank">
                  <div>
                    <span
                      style={{
                        background: `url(/images/socials/socMob-${el.component}.svg) top no-repeat`,
                        width: el.w,
                        height: el.h,
                      }}
                    ></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <UserLists />
        </section>
      </Modal>
    </section>
  );
};

export default MobileBurgerCotnent;
