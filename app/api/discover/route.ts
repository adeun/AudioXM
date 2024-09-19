// API route in the App Directory with TypeScript
// Path: app/api//route.ts
import GetAlbumAll from '@/server/songAction/getAlbumAll';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Fetching data (if applicable)
    const data = await GetAlbumAll();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}


