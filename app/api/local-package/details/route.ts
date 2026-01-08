// app/api/local-package/details/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getLocalPackageDetails } from '@/lib/api';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cityName = searchParams.get('cityName');

    if (!cityName) {
      return NextResponse.json(
        {
          success: false,
          error: 'City name is required',
          packages: [],
          cars: {},
        },
        { status: 400 }
      );
    }

    const data = await getLocalPackageDetails(cityName);

    if (!data) {
      throw new Error('Failed to fetch package details');
    }

    return NextResponse.json({
      success: true,
      cityName,
      packages: data.packageList || [],
      cars: data.cars || {},
    });

  } catch (error) {
    console.error('Error fetching package details:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch package details',
        packages: [],
        cars: {},
      },
      { status: 500 }
    );
  }
}