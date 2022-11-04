import API from "./ApiRequest";

export const getComment = (id) => API.get(`/comment/${id}`);
