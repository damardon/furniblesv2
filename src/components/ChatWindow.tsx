
import React, { useState, useRef, useEffect } from "react";
import { useMessages } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";
import { Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ChatWindowProps {
  chatId: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
  const [input, setInput] = useState("");
  const { user } = useAuth();
  const { messages, sendMessage, isSending } = useMessages(chatId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() && !isSending) {
      sendMessage({ content: input.trim() });
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No hay mensajes aún...</p>
            <p className="text-sm">¡Envía el primer mensaje!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.sender_id === user?.id;
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isOwnMessage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwnMessage ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {formatDistanceToNow(new Date(message.sent_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <textarea
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje..."
            disabled={isSending}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            onClick={handleSend}
            disabled={!input.trim() || isSending}
          >
            <Send className="h-4 w-4" />
            {isSending ? "..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
};
