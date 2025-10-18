import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  //To use this please install cookie-store quickly using npm i cookie-store
  // import { cookieStore } from "cookie-store";
  // headers: {
  //   Authorization: `Bearer ${cookieStore.get("IDCard")?.value || ""}`,
  // },
});

export default api;
