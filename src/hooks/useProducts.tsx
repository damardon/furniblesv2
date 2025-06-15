
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  images: string[];
  rating: number;
  reviews_count: number;
  downloads: number;
  featured: boolean;
  seller: {
    full_name: string;
    username: string;
    avatar_url: string;
  };
  category: {
    name: string;
    slug: string;
  };
}

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          seller:profiles(full_name, username, avatar_url),
          category:categories(name, slug)
        `)
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }

      return data as Product[];
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          seller:profiles(full_name, username, avatar_url),
          category:categories(name, slug)
        `)
        .eq("id", id)
        .eq("status", "published")
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        throw error;
      }

      return data as Product;
    },
    enabled: !!id,
  });
};
