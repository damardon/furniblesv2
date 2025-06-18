
import React, { useState } from "react";
import { ChatList } from "./ChatList";
import { ChatWindow } from "./ChatWindow";
import { MessageCircle } from "lucide-react";

export const MessagingInterface: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>("");

  return (
    <div className="h-full flex bg-white rounded-lg shadow">
      {/* Chat List */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Conversaciones
          </h2>
        </div>
        <ChatList 
          onSelectChat={setSelectedChatId} 
          selectedChatId={selectedChatId}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {selectedChatId ? (
          <ChatWindow chatId={selectedChatId} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">Selecciona una conversación</p>
              <p className="text-sm">Elige un chat para comenzar a conversar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
