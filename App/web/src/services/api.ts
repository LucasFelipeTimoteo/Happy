import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1313",
});

export default api;