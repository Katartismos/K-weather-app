import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

function httpsGet(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        } else {
          const err: any = new Error(`HTTP Error: ${res.statusCode}`);
          err.status = res.statusCode;
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'New York';

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    // 1. Fetch current weather to get coords for UV index
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    
    let currentData;
    try {
      currentData = await httpsGet(currentUrl);
    } catch (err: any) {
      if (err.status === 404) {
        return NextResponse.json({ error: 'City not found' }, { status: 404 });
      }
      throw err;
    }
    
    const { lat, lon } = currentData.coord;

    // 2. Fetch forecast and UV index in parallel
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const [forecastData, uvData] = await Promise.all([
      httpsGet(forecastUrl),
      httpsGet(uvUrl).catch(() => ({ value: 0 }))
    ]);

    return NextResponse.json({
      current: currentData,
      forecast: forecastData,
      uv: uvData
    });
  } catch (error: any) {
    console.error('Weather API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}