
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useChatMessages } from "@/hooks/useChatMessages";

interface ChatWindowProps {
  chatId: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const { messages, isLoading, sendMessage } = useChatMessages(chatId, user?.id);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="w-full h-full flex flex-col border rounded-lg">
      <div className="flex-1 overflow-auto p-2">
        {isLoading ? (
          <p className="text-gray-500">Cargando mensajes...</p>
        ) : (
          messages.map((msg: any) => (
            <div
              key={msg.id}
              className={`mb-2 ${
                msg.sender_id === user?.id
                  ? "text-right"
                  : "text-left"
              }`}
            >
              <div className={`inline-block px-3 py-1 rounded-lg ${
                msg.sender_id === user?.id
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-700"
              }`}>
                {msg.content}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(msg.sent_at).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-2 border-t flex gap-2">
        <input
          className="w-full border px-3 py-2 rounded"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};
