
import React, { useState } from "react";

interface ChatWindowProps {
  chatId: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now(),
        content: input.trim(),
        sender_id: "current_user",
        sent_at: new Date().toISOString()
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  return (
    <div className="w-full h-full flex flex-col border rounded-lg">
      <div className="flex-1 overflow-auto p-2">
        {messages.length === 0 ? (
          <p className="text-gray-500">No hay mensajes aún...</p>
        ) : (
          messages.map((msg: any) => (
            <div key={msg.id} className="mb-2 text-left">
              <div className="inline-block px-3 py-1 rounded-lg bg-gray-100 text-gray-700">
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
