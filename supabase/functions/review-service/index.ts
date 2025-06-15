
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
      case endpoint.startsWith('product-') && method === 'GET':
        const productId = endpoint.split('-')[1];
        return await getProductReviews(productId, url.searchParams);
      case endpoint === 'reviews' && method === 'POST':
        return await createReview(req);
      case endpoint.startsWith('review-') && method === 'PUT':
        const reviewId = endpoint.split('-')[1];
        return await updateReview(req, reviewId);
      case endpoint.startsWith('review-') && method === 'DELETE':
        const deleteReviewId = endpoint.split('-')[1];
        return await deleteReview(req, deleteReviewId);
      case endpoint === 'my-reviews' && method === 'GET':
        return await getMyReviews(req, url.searchParams);
      default:
        return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
  } catch (error) {
    console.error('Review service error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function getProductReviews(productId: string, searchParams: URLSearchParams) {
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const sort = searchParams.get('sort') || 'created_at';
  const order = searchParams.get('order') || 'desc';

  const { data: reviews, error, count } = await supabase
    .from('reviews')
    .select(`
      *,
      buyer:profiles(
        full_name,
        username,
        avatar_url
      )
    `, { count: 'exact' })
    .eq('product_id', productId)
    .range((page - 1) * limit, page * limit - 1)
    .order(sort, { ascending: order === 'asc' });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Get rating summary
  const { data: ratingStats } = await supabase
    .from('reviews')
    .select('rating')
    .eq('product_id', productId);

  const ratingCounts = {
    5: 0, 4: 0, 3: 0, 2: 0, 1: 0
  };

  ratingStats?.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating as keyof typeof ratingCounts]++;
    }
  });

  const totalReviews = ratingStats?.length || 0;
  const averageRating = totalReviews > 0 
    ? ratingStats.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
    : 0;

  return new Response(JSON.stringify({
    reviews,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil((count || 0) / limit),
    },
    summary: {
      totalReviews,
      averageRating: Math.round(averageRating * 100) / 100,
      ratingCounts,
    },
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function createReview(req: Request) {
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

  const { product_id, rating, comment } = await req.json();

  // Check if user has purchased this product
  const { data: order } = await supabase
    .from('orders')
    .select('id')
    .eq('buyer_id', userData.user.id)
    .eq('product_id', product_id)
    .eq('status', 'completed')
    .single();

  if (!order) {
    return new Response(JSON.stringify({ 
      error: 'You can only review products you have purchased' 
    }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const { data: review, error } = await supabase
    .from('reviews')
    .insert({
      product_id,
      buyer_id: userData.user.id,
      rating,
      comment,
    })
    .select(`
      *,
      buyer:profiles(
        full_name,
        username,
        avatar_url
      )
    `)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ review }), {
    status: 201,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function updateReview(req: Request, reviewId: string) {
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

  const { data: review, error } = await supabase
    .from('reviews')
    .update(updates)
    .eq('id', reviewId)
    .eq('buyer_id', userData.user.id)
    .select(`
      *,
      buyer:profiles(
        full_name,
        username,
        avatar_url
      )
    `)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ review }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function deleteReview(req: Request, reviewId: string) {
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
    .from('reviews')
    .delete()
    .eq('id', reviewId)
    .eq('buyer_id', userData.user.id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ message: 'Review deleted successfully' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function getMyReviews(req: Request, searchParams: URLSearchParams) {
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

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const { data: reviews, error, count } = await supabase
    .from('reviews')
    .select(`
      *,
      product:products(
        id,
        title,
        image_url
      )
    `, { count: 'exact' })
    .eq('buyer_id', userData.user.id)
    .range((page - 1) * limit, page * limit - 1)
    .order('created_at', { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({
    reviews,
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
