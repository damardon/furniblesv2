
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  message_type: string;
  read: boolean;
  sent_at: string;
}

export function useMessages(chatId: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      if (!chatId) return [];
      
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("sent_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        throw error;
      }

      return data as Message[];
    },
    enabled: !!chatId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async ({ content, messageType = "text" }: { content: string; messageType?: string }) => {
      if (!user || !chatId) throw new Error("Missing requirements");

      const { data, error } = await supabase
        .from("messages")
        .insert({
          chat_id: chatId,
          sender_id: user.id,
          content,
          message_type: messageType,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
    },
  });

  // Set up real-time subscription for new messages
  useEffect(() => {
    if (!chatId) return;

    const channel = supabase
      .channel(`messages:${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          queryClient.setQueryData(
            ["messages", chatId],
            (old: Message[] = []) => [...old, payload.new as Message]
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, queryClient]);

  return {
    messages,
    isLoading,
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isPending,
  };
}
