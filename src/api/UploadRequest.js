import API from "./ApiRequest";

export const uploadImage = (data) => API.post("/upload", data);
export const uploadPost = (data) => API.post("/post", data);
