import { AxiosInstance } from "axios";
import { List } from "../types/ListType";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const getListData = async (
  axiosInstance: AxiosInstance,
  page: number,
  pageSize = 50
) => {
  return axiosInstance
    .get(`/lists?page=${page}&pageSize=${pageSize}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const addList = async (axiosInstance: AxiosInstance, list: List) => {
  return axiosInstance
    .post("/lists", list)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteList = async (axiosInstance: AxiosInstance, id: string) => {
  return axiosInstance
    .delete(`/lists/${id}`)
    .then(() => {
      return;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateList = async (axiosInstance: AxiosInstance, list: List) => {
  return axiosInstance
    .patch(`/lists/${list.id}`, list)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
