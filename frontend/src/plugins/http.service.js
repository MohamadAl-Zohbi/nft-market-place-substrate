import { loading, snackbarMsg } from "@/plugins/global";
import axios from "axios";

const IMG_PATH = "http://localhost/cex-exchanger-backend/api/uploads/";
const API_ENDPOINT = "http://localhost:5000/"; /// local

const axiosInstance = axios.create({
  baseURL: `${API_ENDPOINT}`,
  headers: {
    token: localStorage.getItem("token"),
  },
});

const onRequest = (request) => {
  console.log(1);
  loading(true);
  return request;
};
const onRequestError = (error) => {
  console.log(2);
  snackbarMsg("Request Error");
  return Promise.reject(error);
};

const onResponse = (response) => {
  console.log(3);
  loading(false);
  return response;
};
const onResponseError = (error) => {
  console.log(4);
  const statusCode = error?.response?.status;
  if (statusCode === 401) {
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  }
  loading(false);
  snackbarMsg("Response Error");
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export { API_ENDPOINT, IMG_PATH };
export default axiosInstance;
