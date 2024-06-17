"use client";
import React, { useState } from "react";
import { StarIcon, PlusIcon } from "@/common/svg/home";
import style from "./style.module.css";
import { Modal } from "antd";
import { Select, Space } from "antd";

const UserTeams = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <section className={`p-4   mb-9`}>
      <div className={`${style.myTeamsTitle} flex items-center pb-3  `}>
        <StarIcon />
        <h2 className="ml-2  text-userList-light font-bold ">MY TEAMS</h2>
      </div>

      <div className={`${style.teams} flex items-center`} onClick={showModal}>
        <PlusIcon />
        <h2 className="ml-2 text-userList-light font-semibold  ">
          ADD THE TEAM
        </h2>
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <h4 className={style.modalTitle}>Search</h4>
        <div className={`flex h-9 ${style.modalInputSearch}`}>
          <input type="text" placeholder="type your search here" />

          <div className={`${style.searchSelector} h-full`}>
            <Space wrap style={{ border: "none" }}>
              <Select
                defaultValue="Alpine Skying"
                style={{ width: 150, fontSize: 11 }}
                onChange={handleChange}
                variant={"borderless"}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
            </Space>
          </div>
        </div>

        <article className={`${style.searches}`}>
          <p className={`${style.searchesTitle}`}>Most popular searches</p>
          <div className={`${style.searchesListItems}`}>
            <div className={`${style.searchItem}`}>
              <div className={`${style.flagIcon}`}>flag</div>
              <div>
                <h3>Georgia</h3>
                <p>Socces, Europe</p>
              </div>
            </div>
          </div>
        </article>
      </Modal>
    </section>
  );
};

export default UserTeams;
