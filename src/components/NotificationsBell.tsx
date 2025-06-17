
import { Bell } from "lucide-react";
import { useState } from "react";

export function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const notifications: any[] = [];

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="relative">
        <Bell className="h-6 w-6" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
          0
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border p-2 z-50 max-h-80 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-2">Notificaciones</h3>
          <p className="text-gray-500">Sin notificaciones.</p>
        </div>
      )}
    </div>
  );
}
