
import { Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { useState } from "react";

export function NotificationsBell() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { notifications, isLoading, markAsRead } = useNotifications(user?.id);

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="relative">
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border p-2 z-50 max-h-80 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-2">Notificaciones</h3>
          {isLoading ? (
            <p>Cargando...</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-500">Sin notificaciones.</p>
          ) : (
            notifications.map((n: any) => (
              <div
                key={n.id}
                className={`p-2 rounded hover:bg-gray-100 flex justify-between items-center ${n.read ? "opacity-60" : ""}`}
              >
                <div>
                  <strong>{n.title}</strong>
                  <p className="text-xs">{n.body}</p>
                  <p className="text-[10px] text-gray-400">
                    {new Date(n.created_at).toLocaleString()}
                  </p>
                </div>
                {!n.read && (
                  <button
                    className="text-xs text-blue-500 underline"
                    onClick={() => markAsRead(n.id)}
                  >
                    Marcar como leída
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
