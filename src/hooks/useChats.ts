
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Chat {
  id: string;
  buyer_id: string;
  seller_id: string;
  product_id: string;
  created_at: string;
  updated_at: string;
  product: {
    title: string;
    image_url: string;
  };
  buyer: {
    full_name: string;
    username: string;
  };
  seller: {
    full_name: string;
    username: string;
  };
}

export function useChats() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: chats = [], isLoading } = useQuery({
    queryKey: ["chats", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("chats")
        .select(`
          *,
          product:products(title, image_url),
          buyer:buyer_id(full_name, username),
          seller:seller_id(full_name, username)
        `)
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error fetching chats:", error);
        throw error;
      }

      return data as Chat[];
    },
    enabled: !!user,
  });

  const createChatMutation = useMutation({
    mutationFn: async ({ productId, sellerId }: { productId: string; sellerId: string }) => {
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("chats")
        .insert({
          buyer_id: user.id,
          seller_id: sellerId,
          product_id: productId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  return {
    chats,
    isLoading,
    createChat: createChatMutation.mutate,
    isCreatingChat: createChatMutation.isPending,
  };
}
