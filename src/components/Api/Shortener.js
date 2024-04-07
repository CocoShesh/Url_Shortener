import axios from "axios";
const API_URL = import.meta.env.VITE_APP_BASE_URL;
const BearToken = import.meta.env.VITE_APP_BEARER_TOKEN;
const QRcodeURL = import.meta.env.VITE_APP_QR_CODE_URL;
const NumberOFClicksURL = import.meta.env.VITE_APP_NUMBER_OF_LINKS;

export const generateShortLink = async url => {
  try {
    let config = {
      method: "post",
      url: `${API_URL}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BearToken}`,
      },
      data: url,
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getNumberOfClicks = async link => {
  try {
    let config = {
      method: "get",
      url: `${NumberOFClicksURL}/stats?short_url=${link}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BearToken}`,
      },
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getQRCode = async link => {
  try {
    let config = {
      method: "get",
      url: `${QRcodeURL}/link?short_url=${link}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BearToken}`,
      },
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
