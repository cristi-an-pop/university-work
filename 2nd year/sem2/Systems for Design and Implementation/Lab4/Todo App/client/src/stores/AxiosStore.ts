import { create } from "zustand";
import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://localhost:5000/api";

interface AxiosState {
  axiosConnection: AxiosInstance;
  getAxiosInstance: () => AxiosInstance;
}

export const useAxiosStore = create<AxiosState>()((set, get) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      if (error.code === "ERR_NETWORK") {
        console.log(
          "Network error. The server is not responding. Please try again later"
        );
        // window.alert(
        //   "Network error. The server is not responding. Please try again later"
        // );
      }
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.code === "ERR_NETWORK") {
        console.log(
          "Network error. The server is not responding. Please try again later"
        );
        // window.alert(
        //   "Network error. The server is not responding. Please try again later"
        // );
      }
      return Promise.reject(error);
    }
  );
  return {
    axiosConnection: instance,

    getAxiosInstance: () => get().axiosConnection,
  };
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
