import '../css/Notification.css'
import { useNotificationStore } from "../stores/NotificationStore";

function NotificationDisplay() {
    const { notifications } = useNotificationStore();

    return (
        <div>
            {notifications.map((notification) => (
                <div key={notification.id} className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            ))}
        </div>
    )
}

export default NotificationDisplay;