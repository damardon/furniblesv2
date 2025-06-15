
import React, { useRef } from "react";
import { useProductFileUpload } from "@/hooks/useProductFileUpload";

interface ProductFileUploadProps {
  productId: string;
}

export const ProductFileUpload: React.FC<ProductFileUploadProps> = ({ productId }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { uploadFile, uploading, error, url } = useProductFileUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      uploadFile(productId, e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="*"
        onChange={handleFileChange}
        ref={inputRef}
        className="block"
        disabled={uploading}
      />
      {uploading && <p className="text-sm text-gray-600">Subiendo archivo...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {url && (
        <p className="text-sm text-green-700">
          Archivo subido:{" "}
          <a href={url} className="underline" target="_blank" rel="noopener">
            {url}
          </a>
        </p>
      )}
    </div>
  );
};
