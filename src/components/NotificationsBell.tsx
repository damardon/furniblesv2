
import { Bell } from "lucide-react";
import { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";

export function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const { notifications, markAsRead, unreadCount } = useNotifications();

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs min-w-[20px] h-5 flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>
      
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border p-4 z-50 max-h-96 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-3">Notificaciones</h3>
          
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Sin notificaciones.</p>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    notification.read 
                      ? "bg-gray-50 text-gray-600" 
                      : "bg-blue-50 text-gray-800 border-l-4 border-blue-500"
                  }`}
                  onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      {notification.body && (
                        <p className="text-sm mt-1">{notification.body}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
