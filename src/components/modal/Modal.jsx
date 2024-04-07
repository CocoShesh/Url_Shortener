import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useUrl } from "../context/UrlContext";
import { useForm } from "react-hook-form";
import { generateShortLink } from "../Api/Shortener";
const InputModal = ({ userInput, copiedLink }) => {
  const { open, onCloseModal, setShortLinks, shortLinks } = useUrl();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      const response = await generateShortLink(data);
      const updatedShortLinks = [...shortLinks, response.short_url];
      setShortLinks(updatedShortLinks);
      reset();
      onCloseModal();
      const lastestLink = updatedShortLinks[updatedShortLinks.length - 1];
      copiedLink(lastestLink);
      localStorage.setItem("shortLinks", JSON.stringify(updatedShortLinks));
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    setValue("long_url", userInput);
    setValue("expire_at_views", 2);
  }, [userInput]);
  return (
    <>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
          closeIcon: "customCloseIcon",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-3xl font-bold text-[#323e59] mb-10">
            Url Shortener
          </h2>

          {/* Link */}
          <label htmlFor="link" className="text-2xl">
            Link
          </label>
          <section className="relative">
            <input
              type="text"
              placeholder="Enter the link here"
              {...register("long_url", { required: true })}
              id="link"
              className="bg-[#181e29]  border-4 border-[#323e59] placeholder:font-sans my-3  pl-14 placeholder:text-lg outline-none w-full h-14 rounded-2xl px-2"
            />
            <img src="/link.svg" alt="" className="absolute top-8  left-5" />
          </section>

          {/* password */}
          <section className="flex gap-3 items-center">
            <section className="w-full">
              <label htmlFor="Password" className="text-2xl">
                Password <span className="text-[#323e59] "> (Optional)</span>
              </label>
              <section className="relative">
                <input
                  type="Password"
                  placeholder="Enter your password"
                  id="Password"
                  {...register("password")}
                  className="bg-[#181e29]  border-4 border-[#323e59] placeholder:font-sans my-3  pl-14 placeholder:text-lg outline-none w-full h-14 rounded-2xl px-2"
                />
                <img
                  src="/link.svg"
                  alt=""
                  className="absolute top-8  left-5"
                />
              </section>
            </section>
            {/* expired */}
            <section className="w-[200px] text-center mt-2">
              <label htmlFor="views" className="text-sm  uppercase ">
                Expired at views
              </label>
              <section className="relative">
                <input
                  type="text"
                  id="views"
                  {...register("expire_at_views")}
                  disabled={true}
                  className="bg-[#181e29]  select-none border-4 border-[#323e59] placeholder:font-sans my-3  text-xl text-center placeholder:text-lg outline-none w-full h-14 rounded-2xl px-2"
                />
              </section>
            </section>
          </section>
          {/* description */}
          <label htmlFor="Description" className="text-2xl">
            Description
          </label>
          <section className="relative">
            <textarea
              type="text"
              placeholder="Enter your description"
              id="Description"
              {...register("description")}
              className="bg-[#181e29]  border-4 border-[#323e59] placeholder:font-sans mt-3  pl-5  pt-3 placeholder:text-lg outline-none w-full h-28 rounded-2xl px-2"
            />
          </section>
          <button
            type="submit"
            className="h-[53px] w-40 rounded-full font-semibold bg-[#144ee3]  mt-5 flex ml-auto items-center justify-center  shadow-custom"
          >
            Shorten Now!
          </button>
        </form>
      </Modal>
    </>
  );
};

export default InputModal;
