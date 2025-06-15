
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

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const endpoint = pathParts[pathParts.length - 1];
    const method = req.method;

    switch (true) {
      case endpoint === 'orders' && method === 'GET':
        return await getOrders(userData.user.id, url.searchParams);
      case endpoint === 'orders' && method === 'POST':
        return await createOrder(req, userData.user.id);
      case endpoint.startsWith('order-') && method === 'GET':
        const orderId = endpoint.split('-')[1];
        return await getOrder(orderId, userData.user.id);
      case endpoint.startsWith('order-') && method === 'PUT':
        const updateOrderId = endpoint.split('-')[1];
        return await updateOrderStatus(req, updateOrderId, userData.user.id);
      case endpoint === 'sales' && method === 'GET':
        return await getSales(userData.user.id, url.searchParams);
      case endpoint === 'stats' && method === 'GET':
        return await getOrderStats(userData.user.id);
      default:
        return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
  } catch (error) {
    console.error('Order service error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function getOrders(userId: string, searchParams: URLSearchParams) {
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const status = searchParams.get('status');

  let query = supabase
    .from('orders')
    .select(`
      *,
      product:products(
        id,
        title,
        image_url,
        price
      ),
      seller:profiles!orders_seller_id_fkey(
        full_name,
        username
      )
    `)
    .eq('buyer_id', userId)
    .range((page - 1) * limit, page * limit - 1)
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data: orders, error, count } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    orders,
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

async function createOrder(req: Request, userId: string) {
  const { product_id, payment_method } = await req.json();

  // Get product details
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('id', product_id)
    .single();

  if (productError || !product) {
    return new Response(JSON.stringify({ error: 'Product not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Create order
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      buyer_id: userId,
      product_id: product_id,
      seller_id: product.seller_id,
      amount: product.price,
      status: 'pending',
    })
    .select(`
      *,
      product:products(
        id,
        title,
        image_url,
        price
      ),
      seller:profiles!orders_seller_id_fkey(
        full_name,
        username
      )
    `)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ order }), {
    status: 201,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function getOrder(orderId: string, userId: string) {
  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      product:products(
        id,
        title,
        description,
        image_url,
        price,
        files
      ),
      seller:profiles!orders_seller_id_fkey(
        full_name,
        username,
        bio
      ),
      buyer:profiles!orders_buyer_id_fkey(
        full_name,
        username
      )
    `)
    .eq('id', orderId)
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: 'Order not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ order }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function updateOrderStatus(req: Request, orderId: string, userId: string) {
  const { status } = await req.json();

  // Verify user is the seller of this order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('seller_id')
    .eq('id', orderId)
    .single();

  if (orderError || !order) {
    return new Response(JSON.stringify({ error: 'Order not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (order.seller_id !== userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { data: updatedOrder, error } = await supabase
    .from('orders')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', orderId)
    .select(`
      *,
      product:products(
        id,
        title,
        image_url,
        price
      ),
      buyer:profiles!orders_buyer_id_fkey(
        full_name,
        username
      )
    `)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ order: updatedOrder }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function getSales(userId: string, searchParams: URLSearchParams) {
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const status = searchParams.get('status');

  let query = supabase
    .from('orders')
    .select(`
      *,
      product:products(
        id,
        title,
        image_url,
        price
      ),
      buyer:profiles!orders_buyer_id_fkey(
        full_name,
        username
      )
    `, { count: 'exact' })
    .eq('seller_id', userId)
    .range((page - 1) * limit, page * limit - 1)
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data: sales, error, count } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    sales,
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

async function getOrderStats(userId: string) {
  // Get profile to check role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (profile?.role === 'seller') {
    // Get seller stats
    const { data: salesStats } = await supabase
      .from('orders')
      .select('amount, status')
      .eq('seller_id', userId);

    const totalSales = salesStats?.length || 0;
    const totalRevenue = salesStats?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0;
    const completedSales = salesStats?.filter(order => order.status === 'completed').length || 0;
    const pendingSales = salesStats?.filter(order => order.status === 'pending').length || 0;

    return new Response(JSON.stringify({
      stats: {
        totalSales,
        totalRevenue,
        completedSales,
        pendingSales,
      },
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } else {
    // Get buyer stats
    const { data: orderStats } = await supabase
      .from('orders')
      .select('amount, status')
      .eq('buyer_id', userId);

    const totalOrders = orderStats?.length || 0;
    const totalSpent = orderStats?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0;
    const completedOrders = orderStats?.filter(order => order.status === 'completed').length || 0;
    const pendingOrders = orderStats?.filter(order => order.status === 'pending').length || 0;

    return new Response(JSON.stringify({
      stats: {
        totalOrders,
        totalSpent,
        completedOrders,
        pendingOrders,
      },
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
