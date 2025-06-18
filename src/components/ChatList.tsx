
import React from "react";
import { useChats } from "@/hooks/useChats";
import { useAuth } from "@/hooks/useAuth";
import { MessageCircle, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ChatListProps {
  onSelectChat: (chatId: string) => void;
  selectedChatId?: string;
}

export const ChatList: React.FC<ChatListProps> = ({ onSelectChat, selectedChatId }) => {
  const { chats, isLoading } = useChats();
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>No hay conversaciones aún</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {chats.map((chat) => {
        const otherUser = chat.buyer_id === user?.id ? chat.seller : chat.buyer;
        const isSelected = selectedChatId === chat.id;
        
        return (
          <div
            key={chat.id}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              isSelected ? "bg-blue-50 border-r-4 border-blue-500" : ""
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {otherUser.full_name || otherUser.username || "Usuario"}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(chat.updated_at), { addSuffix: true })}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 truncate mt-1">
                  {chat.product.title}
                </p>
                
                <div className="flex items-center mt-2">
                  {chat.product.image_url && (
                    <img
                      src={chat.product.image_url}
                      alt={chat.product.title}
                      className="w-8 h-8 object-cover rounded"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
