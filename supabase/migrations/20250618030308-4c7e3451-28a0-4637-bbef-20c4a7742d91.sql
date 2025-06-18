
-- First, drop the existing policy that depends on receiver_id
DROP POLICY IF EXISTS "Can view own chats" ON public.messages;

-- Crear tabla para chats entre compradores y vendedores
CREATE TABLE IF NOT EXISTS public.chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(buyer_id, seller_id, product_id)
);

-- Habilitar RLS para chats
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

-- Políticas para chats
CREATE POLICY "Users can view their own chats" ON public.chats
  FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Users can create chats" ON public.chats
  FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Actualizar tabla de mensajes para referenciar chats
ALTER TABLE public.messages 
  DROP COLUMN IF EXISTS receiver_id CASCADE,
  ADD COLUMN IF NOT EXISTS message_type TEXT DEFAULT 'text',
  ADD COLUMN IF NOT EXISTS read BOOLEAN DEFAULT false;

-- Agregar foreign key a chat_id si no existe
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'messages_chat_id_fkey'
  ) THEN
    ALTER TABLE public.messages ADD CONSTRAINT messages_chat_id_fkey 
    FOREIGN KEY (chat_id) REFERENCES public.chats(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Habilitar RLS para mensajes
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Políticas para mensajes
CREATE POLICY "Users can view messages from their chats" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.chats 
      WHERE chats.id = messages.chat_id 
      AND (chats.buyer_id = auth.uid() OR chats.seller_id = auth.uid())
    )
  );

CREATE POLICY "Users can create messages in their chats" ON public.messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.chats 
      WHERE chats.id = messages.chat_id 
      AND (chats.buyer_id = auth.uid() OR chats.seller_id = auth.uid())
    )
  );

-- Crear tabla para descargas de productos
CREATE TABLE IF NOT EXISTS public.downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  download_url TEXT,
  downloaded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '24 hours'),
  UNIQUE(user_id, product_id, order_id)
);

-- Habilitar RLS para descargas
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;

-- Políticas para descargas
CREATE POLICY "Users can view their own downloads" ON public.downloads
  FOR SELECT USING (auth.uid() = user_id);

-- Crear storage bucket para archivos de productos
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-files', 'product-files', false)
ON CONFLICT (id) DO NOTHING;

-- Políticas para el bucket de archivos de productos
CREATE POLICY "Sellers can upload product files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'product-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Authenticated users can view product files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'product-files' AND
    auth.role() = 'authenticated'
  );

-- Agregar campos adicionales a la tabla products si no existen
ALTER TABLE public.products 
  ADD COLUMN IF NOT EXISTS file_size BIGINT,
  ADD COLUMN IF NOT EXISTS file_format TEXT,
  ADD COLUMN IF NOT EXISTS dimensions TEXT,
  ADD COLUMN IF NOT EXISTS difficulty_level TEXT DEFAULT 'intermediate';

-- Actualizar las notificaciones para que tengan RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

-- Agregar índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_chats_buyer_seller ON public.chats(buyer_id, seller_id);
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON public.messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_downloads_user_product ON public.downloads(user_id, product_id);
CREATE INDEX IF NOT EXISTS idx_products_seller_status ON public.products(seller_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_status ON public.orders(buyer_id, status);
