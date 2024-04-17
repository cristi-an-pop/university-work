import { useNotificationStore } from '../stores/NotificationStore';

const Notification = () => {
  const notifications = useNotificationStore(state => state.notifications);

  return (
    <div>
      {notifications.map(({ id, message, type }) => (
        <NotificationWrapper key={id} type={type}>
          {message}
        </NotificationWrapper>
      ))}
    </div>
  );
};

export default Notification;