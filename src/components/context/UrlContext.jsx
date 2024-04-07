import { createContext, useState, useContext, useEffect } from "react";

const UrlContext = createContext();

export const useUrl = () => {
  return useContext(UrlContext);
};
export const UrlProvider = ({ children }) => {
  const [shortLinks, setShortLinks] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    const storedShortLinks = localStorage.getItem("shortLinks");
    const storedData = localStorage.getItem("Output");
    if (storedShortLinks) {
      setShortLinks(JSON.parse(storedShortLinks));
    }
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Output", JSON.stringify(data));
  }, [data]);

  return (
    <UrlContext.Provider
      value={{
        shortLinks,
        setShortLinks,
        setData,
        data,
        open,
        onOpenModal,
        onCloseModal,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};
