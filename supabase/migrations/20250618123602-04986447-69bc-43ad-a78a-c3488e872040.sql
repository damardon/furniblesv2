
-- First, let's check if there are existing foreign keys and remove them if they reference auth.users
DO $$ 
BEGIN
  -- Drop existing foreign key constraints if they exist
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'chats_buyer_id_fkey' 
    AND table_name = 'chats'
  ) THEN
    ALTER TABLE public.chats DROP CONSTRAINT chats_buyer_id_fkey;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'chats_seller_id_fkey' 
    AND table_name = 'chats'
  ) THEN
    ALTER TABLE public.chats DROP CONSTRAINT chats_seller_id_fkey;
  END IF;
END $$;

-- Add foreign key constraints that reference the profiles table
ALTER TABLE public.chats 
  ADD CONSTRAINT chats_buyer_id_fkey 
  FOREIGN KEY (buyer_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.chats 
  ADD CONSTRAINT chats_seller_id_fkey 
  FOREIGN KEY (seller_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
