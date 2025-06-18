
-- Check and add foreign key constraints that don't already exist
DO $$ 
BEGIN
  -- Add buyer_id foreign key if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'chats_buyer_id_fkey' 
    AND table_name = 'chats'
  ) THEN
    ALTER TABLE public.chats 
      ADD CONSTRAINT chats_buyer_id_fkey 
      FOREIGN KEY (buyer_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;

  -- Add seller_id foreign key if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'chats_seller_id_fkey' 
    AND table_name = 'chats'
  ) THEN
    ALTER TABLE public.chats 
      ADD CONSTRAINT chats_seller_id_fkey 
      FOREIGN KEY (seller_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;

  -- Add product_id foreign key if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'chats_product_id_fkey' 
    AND table_name = 'chats'
  ) THEN
    ALTER TABLE public.chats 
      ADD CONSTRAINT chats_product_id_fkey 
      FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
  END IF;
END $$;
