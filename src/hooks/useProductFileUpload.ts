
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useProductFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const uploadFile = async (productId: string, file: File) => {
    setUploading(true);
    setError(null);
    setUrl(null);

    const filePath = `${productId}/${file.name}`;
    const { data, error } = await supabase.storage
      .from("product-files")
      .upload(filePath, file);

    if (error) {
      setError(error.message);
      setUploading(false);
      return;
    }

    // Generate a public URL
    const { data: publicData } = supabase.storage
      .from("product-files")
      .getPublicUrl(filePath);

    setUrl(publicData?.publicUrl ?? null);
    setUploading(false);
  };

  return { uploadFile, uploading, error, url };
}
