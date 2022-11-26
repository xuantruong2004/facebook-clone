import axios from "axios";

const API = axios.create({
  // baseURL: "https://truongxuan-face-server.herokuapp.com/",
  baseURL: "https://truongxuan-fb-server.onrender.com/",
});
export default API;
