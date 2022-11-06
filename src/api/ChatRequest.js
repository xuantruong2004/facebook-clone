import API from "./ApiRequest";

export const getChats = (userId) => API.get(`/chat/${userId}`);
export const getIdChat = (chatId) => API.get(`/chat/id/${chatId}`);
export const createChat = (data) => API.post("/chat", data);
export const getChat2Id = (id1, id2) => API.get(`/chat/find/${id1}/${id2}`);
