
import { useState } from "react";

export function useChatMessages(chatId: string, userId?: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = (content: string) => {
    if (!chatId) return;
    const newMessage = {
      id: Date.now(),
      chat_id: chatId,
      sender_id: userId || "anonymous",
      content,
      sent_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
}
