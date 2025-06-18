
import React from "react";
import { MessageCircle } from "lucide-react";
import { useChats } from "@/hooks/useChats";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ContactSellerButtonProps {
  productId: string;
  sellerId: string;
  onChatCreated?: (chatId: string) => void;
}

export const ContactSellerButton: React.FC<ContactSellerButtonProps> = ({
  productId,
  sellerId,
  onChatCreated,
}) => {
  const { user } = useAuth();
  const { createChat, isCreatingChat, chats } = useChats();

  // Check if chat already exists
  const existingChat = chats.find(
    chat => chat.product_id === productId && 
    chat.seller_id === sellerId && 
    chat.buyer_id === user?.id
  );

  const handleContactSeller = () => {
    if (!user) {
      toast.error("Debes iniciar sesión para contactar al vendedor");
      return;
    }

    if (user.id === sellerId) {
      toast.error("No puedes contactarte a ti mismo");
      return;
    }

    if (existingChat) {
      onChatCreated?.(existingChat.id);
      toast.success("Chat ya existe, redirigiendo...");
      return;
    }

    createChat(
      { productId, sellerId },
      {
        onSuccess: (newChat) => {
          toast.success("Chat creado exitosamente");
          onChatCreated?.(newChat.id);
        },
        onError: (error) => {
          console.error("Error creating chat:", error);
          toast.error("Error al crear el chat");
        },
      }
    );
  };

  return (
    <button
      onClick={handleContactSeller}
      disabled={isCreatingChat}
      className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-lg transition-colors"
    >
      <MessageCircle className="h-4 w-4" />
      {isCreatingChat 
        ? "Creando chat..." 
        : existingChat 
        ? "Ir al chat" 
        : "Contactar vendedor"
      }
    </button>
  );
};
