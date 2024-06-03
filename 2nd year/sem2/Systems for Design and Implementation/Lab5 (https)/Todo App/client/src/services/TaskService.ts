import { AxiosInstance } from "axios";
import { Task } from "../types/TaskType";

export const getTaskData = async (
  axiosInstance: AxiosInstance,
  listId: string,
  page: number,
  pageSize = 50
) => {
  return axiosInstance
    .get(`/lists/${listId}/tasks?page=${page}&pageSize=${pageSize}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const addTask = async (
  axiosInstance: AxiosInstance,
  listId: string,
  task: Task
) => {
  return axiosInstance
    .post(`/lists/${listId}/tasks`, task)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteTask = async (
  axiosInstance: AxiosInstance,
  listId: string,
  taskId: string
) => {
  return axiosInstance
    .delete(`/lists/${listId}/tasks/${taskId}`)
    .then(() => {
      return;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateTask = async (
  axiosInstance: AxiosInstance,
  listId: string,
  task: Task
) => {
  return axiosInstance
    .patch(`/lists/${listId}/tasks/${task.id}`, task)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
