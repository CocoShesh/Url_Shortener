import React, { useState, useEffect } from "react";
import mql from "@microlink/mql";
import { getQRCode, getNumberOfClicks } from "../Api/Shortener";
import { useUrl } from "../context/UrlContext";
import AOS from "aos";
import "aos/dist/aos.css";
import LazyLoad from "react-lazy-load";

const Table = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [getId, setGetId] = useState(null);
  const { shortLinks, setData, data } = useUrl();
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleDropdown = index => {
    setGetId(prevId => (prevId === index ? null : index));
  };

  const handleCopyLink = async item => {
    try {
      await navigator.clipboard.writeText(item);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    const fetchFullUrl = async () => {
      setIsLoading(true);
      try {
        const responses = await Promise.all(
          shortLinks.map(link => getQRCode(link))
        );
        setData(responses);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchFullUrl();
    AOS.init();
  }, [shortLinks, setData]);

  useEffect(() => {
    const fetchNumberOfClicks = async () => {
      try {
        const clicks = await Promise.all(
          shortLinks.map(link => getNumberOfClicks(link))
        );
        setNumberOfClicks(clicks);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw new Error(error);
      }
    };

    fetchNumberOfClicks();

    const intervalId = setInterval(fetchNumberOfClicks, 30000);
    return () => clearInterval(intervalId);
  }, [shortLinks]);

  useEffect(() => {
    const previewImage = async () => {
      try {
        const uniqueUrls = [...new Set(data.map(item => item.long_url))];
        const responses = await Promise.all(uniqueUrls.map(url => mql(url)));
        setPreviewImages(responses);
      } catch (error) {
        throw new Error(error);
      }
    };

    previewImage();
  }, [data, setPreviewImages]);

  const formatedData = date => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <table className="text-white p-4 mx-10 mt-10 center w-[90%] max-md:w-[100%] table-auto ml-auto mr-auto max-sm:mt-20">
      <thead>
        <tr className="text-left bg-[#181e29] text-[#C9CED6]">
          <th className="p-4 w-[300px]  ">Short Link</th>
          <th className="p-4 w-[300px] max-lg:hidden ">Original Link</th>
          <th className="p-4 w-[300px]  max-lg:hidden  ">QR Code</th>
          <th className="p-4 w-[300px] max-lg:hidden ">Clicks</th>
          <th className="p-4 w-[300px]  max-lg:hidden ">Status</th>
          <th className="p-4 w-[300px]  max-lg:hidden ">Date</th>
        </tr>
      </thead>
      <tbody className="relative">
        {isLoading ? (
          <section className="w-full h-[300px]  absolute top-1 left-0 flex items-center justify-center bg-[#181e29]">
            <div class="custom-loader"></div>
          </section>
        ) : data.length === 0 ? (
          <section className="w-full h-[500px] py-20 absolute top-1 left-0 flex flex-col items-center justify-center bg-[#181e29]">
            <img src="/illustrations.png" alt="" className="h-[200px] mt-10" />
            <p className="text-white text-center text-lg font-semibold mt-3">
              Oops! No history found.
            </p>
            <p className="text-white text-center max-sm:mx-10">
              Why not {""}
              <a
                href="#"
                className="text-red-500 font-semibold hover:underline"
              >
                create a short link now
              </a>{" "}
              {""}
              and keep track of your URLs?
            </p>
          </section>
        ) : (
          data?.map((item, index) => {
            const filtered = previewImages?.filter(list => {
              return list?.data?.url === item?.long_url;
            });

            const filteredNumberOfClicks = numberOfClicks?.filter(list => {
              return list?.data?.short_url === item?.short_url;
            });

            const filteredStatus = filteredNumberOfClicks?.some(list => {
              return list.clicks >= item.expire_at_views;
            });

            return (
              <tr
                className="bg-[#0e131f] p-4 relative text-[#C9CED6]"
                key={index}
              >
                <td className="p-4 text-sm flex items-center gap-2 mr-10 max-lg:w-full  lg:w-[270px]">
                  {item?.short_url}
                  <img
                    src="/copy.svg"
                    alt=""
                    className="cursor-pointer"
                    onClick={() => handleCopyLink(item?.short_url)}
                  />
                </td>
                <div className="p-4 text-sm lg:hidden max-lg:visible absolute right-1 top-0 cursor-pointer">
                  {getId === index ? (
                    <img
                      src="/arrow-up.svg"
                      alt=""
                      onClick={() => handleDropdown(index)}
                    />
                  ) : (
                    <img
                      src="/Arrow-down.svg"
                      alt=""
                      onClick={() => handleDropdown(index)}
                    />
                  )}
                </div>
                <td className="p-4 text-sm max-lg:hidden   ">
                  <span className="flex items-center gap-5 mr-10 overflow-hidden  text-ellipsis  w-[300px]  ">
                    {filtered?.length > 0 ? (
                      filtered?.map((image, index) => (
                        <LazyLoad height={20} key={index}>
                          <img
                            src={image?.data?.logo?.url}
                            alt=""
                            className="w-5 h-5 rounded-full"
                            key={index}
                          />
                        </LazyLoad>
                      ))
                    ) : (
                      <LazyLoad height={20}>
                        <img
                          src="/world-wide-web.png"
                          alt="Preview Image Placeholder"
                          className="w-5 h-5 rounded-full"
                        />
                      </LazyLoad>
                    )}
                    <span className="line-clamp-2"> {item?.long_url}</span>
                  </span>
                </td>
                <td className="   max-lg:hidden ">
                  <span className="flex items-center mr-5 justify-center">
                    <LazyLoad height={28} threshold={0.95}>
                      <img
                        src={item?.qr_code_url}
                        alt=""
                        className="w-7   opacity-35"
                      />
                    </LazyLoad>
                  </span>
                </td>
                <td className="p-4 text-sm   max-lg:hidden ">
                  {filteredNumberOfClicks?.map((items, index) => {
                    return (
                      <span className=" max-md:w-[300px]" key={index}>
                        {!items.clicks ? 0 : items.clicks}
                      </span>
                    );
                  })}
                </td>
                <td className="p-4 text-sm  max-lg:hidden">
                  <span className="flex items-center gap-3 mr-10 ">
                    {filteredStatus ? "Inactive" : "Active"}
                    <img
                      src={filteredStatus ? "/inactive.svg" : "/active.svg"}
                      alt=""
                    />
                  </span>
                </td>
                <td className="p-4 text-sm  max-lg:hidden">
                  {formatedData(item?.created_at)}
                </td>

                {/* DropDown only in mobile  */}
                {getId === index && (
                  <section
                    data-aos="fade-up"
                    className="w-full  h-fit bg-[#181e29] py-2   lg:hidden max-lg:visible"
                  >
                    <div className="flex  flex-col  justify-between  gap-2  w-[250px]  ">
                      <section className="flex  flex-col  ">
                        <div className="text-[#c9ced6] h-10 pl-2 pt-1 font-bold   ">
                          Original Link
                        </div>
                        <section className="flex items-center gap-2 pl-3  ">
                          {filtered?.length > 0 ? (
                            filtered?.map((image, index) => (
                              <img
                                src={image?.data?.logo?.url}
                                alt=""
                                className="w-5 h-5 rounded-full"
                                key={index}
                              />
                            ))
                          ) : (
                            <img
                              src="/world-wide-web.png" // Path to your placeholder image
                              alt="Preview Image Placeholder"
                              className="w-5 h-5 rounded-full"
                            />
                          )}
                          <span className="text-[#C9CED6] overflow-hidden text-ellipsis w-[250px] line-clamp-2 ">
                            {item?.long_url}
                          </span>
                        </section>
                      </section>
                      <section className="flex  flex-col gap-3 pl-3 ">
                        <h1 className="text-[#c9ced6] font-bold">Qr Code: </h1>
                        <img
                          src={item?.qr_code_url}
                          alt=""
                          className="w-7 opacity-35"
                        />
                      </section>
                      <section className="flex gap-3 pl-3">
                        <h1 className="text-[#c9ced6] font-bold">Clicks: </h1>
                        {filteredNumberOfClicks?.map((items, index) => {
                          return (
                            <span className=" max-md:w-[300px]" key={index}>
                              {!items.clicks ? 0 : items.clicks}
                            </span>
                          );
                        })}
                      </section>
                      <span className="flex items-center gap-3 pl-3 ">
                        <h1 className="text-[#c9ced6] font-bold">Status: </h1>
                        <span className="flex items-center gap-3 mr-10 justify-between ">
                          {filteredStatus ? "Inactive" : "Active"}
                          <img
                            src={
                              filteredStatus ? "/inactive.svg" : "/active.svg"
                            }
                            alt=""
                          />
                        </span>
                      </span>
                      <section className="flex items-center gap-3 pl-3 ">
                        <h1 className="text-[#c9ced6] font-bold">Date: </h1>
                        <span className="text-[#C9CED6]">
                          {formatedData(item?.created_at)}
                        </span>
                      </section>
                    </div>
                  </section>
                )}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default Table;
