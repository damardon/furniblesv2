
import { useMessages } from "./useMessages";

// Deprecated: Use useMessages instead
// This file exists for backward compatibility
export function useChatMessages(chatId: string, userId?: string) {
  console.warn("useChatMessages is deprecated. Use useMessages instead.");
  return useMessages(chatId);
}
