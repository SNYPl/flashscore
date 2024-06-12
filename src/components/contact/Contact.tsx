"use client";
import React from "react";
import style from "./style.module.css";
import { Fb, Email, Inst, X, Phone, EmailIcon } from "@/common/svg/contact";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  email: string;
  message: string;
};

const Contact = () => {
  const socLinks = [
    { href: "#", icon: <Fb /> },
    { href: "#", icon: <X /> },
    { href: "#", icon: <Inst /> },
    { href: "#", icon: <Email /> },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  // const sendMessageMutation = useMutation(
  //   (data: Inputs) => axios.post(`/api/contact`, { ...data }),
  //   {
  //     onSuccess: (data: any) => {
  //       return data;
  //     },
  //     onError: (error: any) => {
  //       console.error("Registration error:", error);
  //       return error;
  //     },
  //   }
  // );

  // const { error, data, isLoading, isError, isSuccess } = sendMessageMutation;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    // sendMessageMutation.mutate(data);
  };

  return (
    <section className={`${style.contact}  bg-white`}>
      <div className={style.topHalf}>
        <div>
          <h2>Contact Us</h2>
          <p>
            do you have questions We are ready to share our experience with you.
            Write to us, follow us.
          </p>
        </div>
        <div className="flex">
          {socLinks.map((el) => (
            <Link href={el.href} target="_blank">
              {el.icon}
            </Link>
          ))}
        </div>
        <article className="flex">
          <div className="flex">
            <Phone />
            <p>+995 595 00 00 00 </p>
          </div>
          <div className="flex">
            <EmailIcon />
            <p>Info@Score.ge</p>
          </div>
        </article>
      </div>
      <div className={style.bottomHalf}>
        <h2>Send a Message</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <article className={`${style.mailInputs}`}>
            <div className={`${style.nameInput}`}>
              <input
                type="text"
                placeholder="სახელი"
                {...register("username", {
                  required: {
                    value: true,
                    message: "გრაფა ცარიელია",
                  },
                  minLength: {
                    value: 3,
                    message: "მინიმუმ 3 ასო",
                  },
                })}
              />
              {errors.username && (
                <p className={style.error}>{errors.username.message}</p>
              )}
            </div>
            <div className={`${style.mailInput}`}>
              <input
                type="text"
                placeholder="ელ.ფოსტა"
                id="email"
                {...register("email", {
                  // onChange: () => setError(""),
                  required: {
                    value: true,
                    message: "გრაფა ცარიელია",
                  },
                  minLength: {
                    value: 3,
                    message: "მინიმუმ 3 ასო",
                  },
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "არასწორი ელ.ფოსტის ფორმატი",
                  },
                })}
              />
              {errors.email && (
                <p className={style.error}>{errors.email.message}</p>
              )}
            </div>
          </article>
          <textarea
            {...register("message", {
              required: {
                value: true,
                message: "გრაფა ცარიელია",
              },
              minLength: {
                value: 10,
                message: "მინიმუმ 10 ასო",
              },
            })}
            placeholder="დატოვეთ შეტყობინება.."
            className={`${style.textAreaInput}`}
            required
            rows={6}
          />
          <button type="submit" className={`${style.submitBtn}`}>
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
