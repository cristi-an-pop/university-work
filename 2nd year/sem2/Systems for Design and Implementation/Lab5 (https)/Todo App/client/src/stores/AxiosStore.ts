import { create } from "zustand";
import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://localhost:5000/api";

interface AxiosState {
  axiosConnection: AxiosInstance;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  getAxiosInstance: () => AxiosInstance;
  startPinging: () => void;
  ejectInterceptors?: () => void;
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
        set({ isOnline: false });
        console.log(
          "Network error. The server is not responding. Please try again later"
        );
      }
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      set({ isOnline: true });
      return response;
    },
    (error) => {
      if (error.code === "ERR_NETWORK") {
        set({ isOnline: false });
        console.log(
          "Network error. The server is not responding. Please try again later"
        );
      }
      return Promise.reject(error);
    }
  );

  const startPinging = () => {
    setInterval(async () => {
      try {
        await instance.get("/ping");
        set({ isOnline: true });
      } catch (error) {
        set({ isOnline: false });
      }
    }, 5000);
  };

  const ejectInterceptors = () => {
    return;
  };

  return {
    axiosConnection: instance,
    isOnline: false,
    setIsOnline: (online: boolean) => set({ isOnline: online }),
    getAxiosInstance: () => get().axiosConnection,
    startPinging,
    ejectInterceptors,
  };
});
