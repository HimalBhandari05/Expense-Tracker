// we have to write the interceptor code for this.

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://127.0.0.1:8000/";

let access = localStorage.getItem("access_token");

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${access}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!access) {
    access = localStorage.getItem("access_token");
    req.headers.Authorization = `Bearer ${access}`;
  }
  const user = jwtDecode(access);
  console.log("User Time is ", user.exp);
  const refresh_tok = localStorage.getItem("refresh_token");

  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1; // if difference is less than 1 milisecond then token is considered expired

  if (!isExpired) {
    return req;
  }
  const response_token = await axios.post(`${baseURL}api/token/refresh/`, {
    refresh: refresh_tok,
  }); // object return garxa

  localStorage.setItem("access_token", response_token.data.access);
  access = response_token.data.access;

  req.headers.Authorization = `Bearer ${access}`;
  return req;
});

export default axiosInstance;
