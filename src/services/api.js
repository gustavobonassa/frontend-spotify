import axios from "axios";
import store from "../store";
import { API_URL } from "../config/constant";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const { token } = store.getState().auth;

  const headers = { ...config.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { ...config, headers };
});

export default api;
