import type { Express } from "express";
import { createServer, type Server } from "http";

const ANIMEFLV_API_BASE = 'https://animeflv.ahmedrangel.com/api';

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy all AnimeFLV API requests
  app.get('/api/anime-api/list/animes-on-air', async (req, res) => {
    try {
      const response = await fetch(`${ANIMEFLV_API_BASE}/list/animes-on-air`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching on-air animes:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch on-air animes' });
    }
  });

  app.get('/api/anime-api/list/latest-episodes', async (req, res) => {
    try {
      const response = await fetch(`${ANIMEFLV_API_BASE}/list/latest-episodes`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching latest episodes:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch latest episodes' });
    }
  });

  app.get('/api/anime-api/search', async (req, res) => {
    try {
      const { query, page = 1 } = req.query;
      if (!query) {
        return res.status(400).json({ success: false, error: 'Query parameter is required' });
      }
      console.log('Searching for:', query);
      const response = await fetch(`${ANIMEFLV_API_BASE}/search?query=${encodeURIComponent(query as string)}&page=${page}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error searching anime:', error);
      res.status(500).json({ success: false, error: 'Failed to search anime' });
    }
  });

  app.post('/api/anime-api/search/by-filter', async (req, res) => {
    try {
      const { page = 1, order = 'default' } = req.query;
      const response = await fetch(`${ANIMEFLV_API_BASE}/search/by-filter?page=${page}&order=${order}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error filtering anime:', error);
      res.status(500).json({ success: false, error: 'Failed to filter anime' });
    }
  });

  app.get('/api/anime-api/search/by-url', async (req, res) => {
    try {
      const { url } = req.query;
      const response = await fetch(`${ANIMEFLV_API_BASE}/search/by-url?url=${encodeURIComponent(url as string)}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error searching by URL:', error);
      res.status(500).json({ success: false, error: 'Failed to search by URL' });
    }
  });

  app.get('/api/anime-api/anime/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const response = await fetch(`${ANIMEFLV_API_BASE}/anime/${slug}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching anime detail:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch anime detail' });
    }
  });

  app.get('/api/anime-api/anime/episode/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const response = await fetch(`${ANIMEFLV_API_BASE}/anime/episode/${slug}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching episode detail:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch episode detail' });
    }
  });

  app.get('/api/anime-api/anime/:slug/episode/:number', async (req, res) => {
    try {
      const { slug, number } = req.params;
      const response = await fetch(`${ANIMEFLV_API_BASE}/anime/${slug}/episode/${number}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching episode by number:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch episode by number' });
    }
  });

  // Proxy for anime images to avoid CORS issues
  app.get('/api/proxy-image', async (req, res) => {
    try {
      const { url } = req.query;
      if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
      }
      
      console.log('Proxying image:', url);
      
      const response = await fetch(url as string, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://www3.animeflv.net/',
          'Origin': 'https://www3.animeflv.net',
        },
        redirect: 'follow'
      });
      
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('Content-Type') || 'image/jpeg';
      console.log('Content-Type:', contentType);
      
      const buffer = await response.arrayBuffer();
      res.set('Content-Type', contentType);
      res.set('Cache-Control', 'public, max-age=3600');
      res.set('Access-Control-Allow-Origin', '*');
      res.send(Buffer.from(buffer));
    } catch (error) {
      console.error('Error proxying image:', error);
      // Return a placeholder image on error
      res.redirect('https://via.placeholder.com/300x400/1f2937/10b981?text=Anime');
    }
  });

  // Proxy for episode iframe to avoid sandbox restrictions
  app.get('/api/proxy-episode', async (req, res) => {
    try {
      const { url } = req.query;
      if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
      }
      
      console.log('Proxying episode iframe:', url);
      
      const response = await fetch(url as string, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://www3.animeflv.net/',
        },
        redirect: 'follow'
      });
      
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      
      // Remove any X-Frame-Options headers that prevent embedding
      res.set('Content-Type', 'text/html');
      res.set('Cache-Control', 'public, max-age=300');
      res.set('Access-Control-Allow-Origin', '*');
      res.send(html);
    } catch (error) {
      console.error('Error proxying episode iframe:', error);
      res.status(500).send(`
        <html>
          <body style="background: #000; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial, sans-serif;">
            <div style="text-align: center;">
              <h2>Error al cargar el episodio</h2>
              <p>No se pudo cargar el reproductor del episodio.</p>
              <p>Por favor, intenta con otro servidor.</p>
            </div>
          </body>
        </html>
      `);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
