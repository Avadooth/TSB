import axios from "axios";

const API = axios.create({
  baseURL: "https://tsb-nelt.onrender.com/api",
    withCredentials: true, // Use your backend port
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
