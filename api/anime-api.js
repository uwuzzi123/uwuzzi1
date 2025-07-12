const ANIMEFLV_API_BASE = 'https://animeflv.ahmedrangel.com/api';

export default async function handler(req, res) {
  const { url, method } = req;
  const apiPath = url.replace('/api/anime-api', '');
  
  // Extract the API endpoint from the path
  let endpoint = '';
  
  if (apiPath.includes('/list/animes-on-air')) {
    endpoint = '/list/animes-on-air';
  } else if (apiPath.includes('/list/latest-episodes')) {
    endpoint = '/list/latest-episodes';
  } else if (apiPath.includes('/search/by-filter')) {
    endpoint = '/search/by-filter';
  } else if (apiPath.includes('/search')) {
    endpoint = '/search';
  } else if (apiPath.includes('/anime/episode/')) {
    const slug = apiPath.split('/anime/episode/')[1];
    endpoint = `/anime/episode/${slug}`;
  } else if (apiPath.includes('/anime/')) {
    const slug = apiPath.split('/anime/')[1];
    endpoint = `/anime/${slug}`;
  }

  const url = `${ANIMEFLV_API_BASE}${endpoint}`;
  
  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    };

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS for CORS preflight
    if (method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // Add query parameters for GET requests
    if (method === 'GET' && req.query) {
      const params = new URLSearchParams(req.query);
      const finalUrl = `${url}?${params.toString()}`;
      console.log(`Fetching: ${finalUrl}`);
      
      const response = await fetch(finalUrl, options);
      const data = await response.json();
      
      res.status(200).json({ success: true, data });
      return;
    }

    // Add body for POST requests
    if (method === 'POST' && req.body) {
      options.body = JSON.stringify(req.body);
      console.log(`Posting to: ${url}`);
      
      const response = await fetch(url, options);
      const data = await response.json();
      
      res.status(200).json({ success: true, data });
      return;
    }

    res.status(400).json({ error: 'Invalid request' });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}