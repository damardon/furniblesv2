
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const endpoint = pathParts[pathParts.length - 1];
    const method = req.method;

    switch (true) {
      case endpoint === 'products' && method === 'GET':
        return await getProducts(url.searchParams);
      case endpoint === 'products' && method === 'POST':
        return await createProduct(req);
      case endpoint.startsWith('product-') && method === 'GET':
        const productId = endpoint.split('-')[1];
        return await getProduct(productId);
      case endpoint.startsWith('product-') && method === 'PUT':
        const updateProductId = endpoint.split('-')[1];
        return await updateProduct(req, updateProductId);
      case endpoint.startsWith('product-') && method === 'DELETE':
        const deleteProductId = endpoint.split('-')[1];
        return await deleteProduct(req, deleteProductId);
      case endpoint === 'categories' && method === 'GET':
        return await getCategories();
      case endpoint === 'featured' && method === 'GET':
        return await getFeaturedProducts();
      case endpoint === 'search' && method === 'GET':
        return await searchProducts(url.searchParams);
      default:
        return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
  } catch (error) {
    console.error('Product service error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function getProducts(searchParams: URLSearchParams) {
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const category = searchParams.get('category');
  const sort = searchParams.get('sort') || 'created_at';
  const order = searchParams.get('order') || 'desc';

  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(name),
      seller:profiles(full_name, username)
    `)
    .eq('status', 'published')
    .range((page - 1) * limit, page * limit - 1);

  if (category) {
    query = query.eq('category_id', category);
  }

  query = query.order(sort, { ascending: order === 'asc' });

  const { data: products, error, count } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    products,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil((count || 0) / limit),
    },
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function getProduct(productId: string) {
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name),
      seller:profiles(full_name, username, bio, website),
      reviews:reviews(
        id,
        rating,
        comment,
        created_at,
        buyer:profiles(full_name, username)
      )
    `)
    .eq('id', productId)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: 'Product not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Increment download count for view
  await supabase
    .from('products')
    .update({ downloads: (product.downloads || 0) + 1 })
    .eq('id', productId);

  return new Response(JSON.stringify({ product }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function createProduct(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization required' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: userData, error: authError } = await supabase.auth.getUser(token);

  if (authError) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const productData = await req.json();

  const { data: product, error } = await supabase
    .from('products')
    .insert({
      ...productData,
      seller_id: userData.user.id,
    })
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ product }), {
    status: 201,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function updateProduct(req: Request, productId: string) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization required' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: userData, error: authError } = await supabase.auth.getUser(token);

  if (authError) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const updates = await req.json();

  const { data: product, error } = await supabase
    .from('products')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', productId)
    .eq('seller_id', userData.user.id)
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ product }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function deleteProduct(req: Request, productId: string) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Authorization required' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: userData, error: authError } = await supabase.auth.getUser(token);

  if (authError) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .eq('seller_id', userData.user.id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ message: 'Product deleted successfully' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function getCategories() {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ categories }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function getFeaturedProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name),
      seller:profiles(full_name, username)
    `)
    .eq('status', 'published')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ products }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function searchProducts(searchParams: URLSearchParams) {
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  const { data: products, error, count } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name),
      seller:profiles(full_name, username)
    `, { count: 'exact' })
    .eq('status', 'published')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .range((page - 1) * limit, page * limit - 1)
    .order('created_at', { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    products,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil((count || 0) / limit),
    },
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
