import { create } from "zustand";

type Notification = {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
};

type NotificationState = {
  notifications: Notification[];
  addNotification: (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => void;
  removeNotification: (id: number) => void;
};

let nextId = 1;

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (message, type) =>
    set((state) => {
      const id = nextId++;
      setTimeout(() => state.removeNotification(id), 5000);
      return { notifications: [...state.notifications, { id, message, type }] };
    }),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    })),
}));
