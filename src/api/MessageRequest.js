import API from "./ApiRequest";

export const getMessages = (Id) => API.get(`/message/${Id}`);
export const addMessage = (data) => API.post("/message/", data);
