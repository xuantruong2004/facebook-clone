import API from "./ApiRequest";

export const uploadImage = (data) => API.post("/upload", data);
export const uploadPost = (data) => API.post("/post", data);
export const uploadComment = (data) => API.post("/comment", data);
