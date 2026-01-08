import { NextResponse } from 'next/server';
import { getLocalPackageCities } from '@/lib/api';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const cities = await getLocalPackageCities();

    return NextResponse.json({
      success: true,
      cities,
      count: cities.length,
    });
  } catch (error) {
    console.error('Error fetching local package cities:', error);

    return NextResponse.json(
      {
        success: false,
        cities: [],
        error: 'Failed to fetch cities',
      },
      { status: 500 }
    );
  }
}