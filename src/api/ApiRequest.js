import axios from "axios";

const API = axios.create({
  baseURL: "https://truongxuan-face-server.herokuapp.com/",
});
export default API;
