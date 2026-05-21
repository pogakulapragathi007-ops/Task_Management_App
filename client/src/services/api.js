import axios from "axios";

const API = axios.create({
  baseURL: "https://task-management-app-0dc5.onrender.com/api",
});

export default API;