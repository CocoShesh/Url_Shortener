import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUrl } from "../context/UrlContext";
import InputModal from "../modal/Modal";
import { useEffect } from "react";

const InputUrl = () => {
  const [toggleCopyClipboard, setToggleCopyClipboard] = useState(false);
  const { onOpenModal } = useUrl();
  const [userInput, setUserInput] = useState("");
  const [textCopiedClipboard, setTextCopiedClipboard] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleToggleCopyClipboard = () => {
    setToggleCopyClipboard(prev => !prev);
    localStorage.setItem("toggleCopyClipboard", !toggleCopyClipboard);
  };

  if (toggleCopyClipboard === true) {
    navigator.clipboard.writeText(textCopiedClipboard);
  }
  useEffect(() => {
    const storedToggleCopyClipboard = localStorage.getItem(
      "toggleCopyClipboard"
    );
    if (storedToggleCopyClipboard !== null) {
      setToggleCopyClipboard(JSON.parse(storedToggleCopyClipboard));
    }
  }, []);

  const onSubmit = async data => {
    onOpenModal();
    setUserInput(data.long_url);
    reset();
  };

  return (
    <>
      <section className="flex flex-col items-center h-[300px] w-full mt-20 text-white">
        <section className="w-[650px] max-md:w-full   text-center flex items-center justify-center flex-col">
          <img src="/heading.svg" alt="" />
          <div className="text-sm w-[530px] max-md:w-[330px] mt-5  text-[#818690]">
            Linkly is an efficient and easy-to-use URL shortening service that
            streamlines your online experience.
          </div>
        </section>
        <section className="h-[70px] w-[530px] max-md:w-full  mt-10 mb-5 relative ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Enter the link here"
              className=" h-[70px] w-[530px] max-md:w-full rounded-full  border-4 border-[#323e59] bg-[#181e29] px-14  outline-none"
              {...register("long_url", { required: true })}
            />

            <img src="/link.svg" alt="" className="absolute top-7 left-5" />

            <button
              type="submit"
              className="h-[53px] w-40 rounded-full font-semibold bg-[#144ee3] absolute right-2 top-2  max-sm:top-[80px] max-sm:right-0 max-sm:w-full  shadow-custom"
            >
              Shorten Now!
            </button>
          </form>
        </section>
        <section className="flex  items-center gap-5 select-none max-sm:mt-14">
          <div
            onClick={handleToggleCopyClipboard}
            className="w-12 h-6 rounded-full bg-[#181e29] relative border border-[#323e59] cursor-pointer"
          >
            <div
              className={`w-4 top-[3px]   absolute ${
                toggleCopyClipboard ? " right-1" : "left-1"
              } h-4 rounded-full bg-[#144ee3] transition-all duration-300`}
            ></div>
          </div>
          <span className="text-sm text-[#818690]">
            Auto Paste from Clipboard
          </span>
        </section>
        <p className="text-sm my-5 text-[#818690] max-md:text-center">
          The <b className="text-red-500"> "inactive" </b> status indicates that
          the link has exceeded the maximum number of views.
        </p>
      </section>
      <InputModal userInput={userInput} copiedLink={setTextCopiedClipboard} />
    </>
  );
};

export default InputUrl;
