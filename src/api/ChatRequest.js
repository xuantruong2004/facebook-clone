import API from "./ApiRequest";

export const getChats = (userId) => API.get(`/chat/${userId}`);
export const createChat = (data) => API.post("/chat", data);
