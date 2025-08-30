import axios from "axios";

const api = axios.create({
  baseURL: "https://ktebna.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
