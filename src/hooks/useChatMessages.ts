
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useChatMessages(chatId: string, userId?: string) {
  const queryClient = useQueryClient();

  const fetchMessages = async () => {
    if (!chatId) return [];
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("sent_at", { ascending: true });
    if (error) throw new Error(error.message);
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["chat-messages", chatId],
    queryFn: fetchMessages,
    enabled: !!chatId,
    refetchInterval: 2000, // near real-time
  });

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      if (!userId || !chatId) return;
      const { error } = await supabase.from("messages").insert({
        chat_id: chatId,
        sender_id: userId,
        receiver_id: null,
        content,
      });
      if (error) throw new Error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-messages", chatId] });
    },
  });

  return {
    messages: data || [],
    isLoading,
    sendMessage: sendMessage.mutate,
  };
}
