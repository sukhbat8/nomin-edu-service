import { message } from "antd";
import axios from "axios";

const rootUrl = "/api";

export const getRequest = async (url) => {
  try {
    const res = await axios.get(`${rootUrl}${url}`);
    if (res.data.code === 200) {
      return res.data;
    } else {
      message.error(res.data.data);
      return res.data;
    }
  } catch (err) {
    console.error({ ...err });
    message.error("Алдаа гарлаа системийн админтай холбогдоно уу!");
    return {
      code: 500,
    };
  }
};

export const postRequest = async (url, body) => {
  try {
    const res = await axios.post(`${rootUrl}${url}`, body);
    if (res.data.code === 200) {
      return res.data;
    } else {
      message.error(res.data.data);
    }
  } catch (err) {
    console.error({ ...err });
    message.error("Алдаа гарлаа системийн админтай холбогдоно уу!");
    return {
      code: 500,
    };
  }
};
