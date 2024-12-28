import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const API_KEY = 'ff932902f76c4869bbc8d252caf2a36b'

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Fetch top headlines
    const response = await fetch(
      'https://newsapi.org/v2/top-headlines?country=us&pageSize=100',
      {
        headers: {
          'X-Api-Key': API_KEY
        }
      }
    )

    const data = await response.json()

    return new Response(
      JSON.stringify({ articles: data.articles }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  }
})
