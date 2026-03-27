import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'New York';

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    // 1. Fetch current weather to get coords for UV index
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const currentRes = await fetch(currentUrl);
    
    if (!currentRes.ok) {
      return NextResponse.json({ error: 'City not found' }, { status: currentRes.status });
    }
    
    const currentData = await currentRes.json();
    const { lat, lon } = currentData.coord;

    // 2. Fetch forecast and UV index in parallel
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const [forecastRes, uvRes] = await Promise.all([
      fetch(forecastUrl),
      fetch(uvUrl)
    ]);

    const forecastData = await forecastRes.json();
    const uvData = uvRes.ok ? await uvRes.json() : { value: 0 };

    return NextResponse.json({
      current: currentData,
      forecast: forecastData,
      uv: uvData
    });
  } catch (error) {
    console.error('Weather API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}