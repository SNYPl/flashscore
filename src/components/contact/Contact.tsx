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
    <section className={`${style.contact}  bg-white p-5`}>
      <div className={` ${style.contactContainer} flex flex-col `}>
        <div className={`${style.topHalf} flex items-center flex-col pt-14`}>
          <div className="flex items-center justify-center mb-7 flex-col">
            <h2 className="font-semibold text-3xl mb-5 text-white">
              Contact Us
            </h2>
            <p className={style.paragraph}>
              do you have questions We are ready to share our experience with
              you. Write to us, follow us.
            </p>
          </div>
          <div className="flex gap-x-3 mb-7">
            {socLinks.map((el, id) => (
              <Link href={el.href} target="_blank" key={id}>
                {el.icon}
              </Link>
            ))}
          </div>
          <article className="flex gap-x-7">
            <div className="flex gap-x-3 text-white items-center">
              <Phone />
              <p className="font-semibold text-xs">+995 595 00 00 00 </p>
            </div>
            <div className="flex  gap-x-3 text-white items-center">
              <EmailIcon />
              <p className="font-semibold text-xs">Info@Score.ge</p>
            </div>
          </article>
        </div>
        <div className={`${style.bottomHalf}  pt-14 pb-16`}>
          <h2 className="mb-6 text-center">
            <span>Send a</span> Message
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${style.contactForm}`}
          >
            <article className={`${style.mailInputs}`}>
              <div className={`${style.nameInput}`}>
                <input
                  type="text"
                  placeholder="Name"
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
                  placeholder="E-mail"
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
              placeholder="Message.."
              className={`${style.textAreaInput}`}
              required
              rows={6}
            />
            <button type="submit" className={`${style.submitBtn}`}>
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
