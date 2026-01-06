import { NextResponse } from 'next/server';

const API_BASE = 'https://api.oneway.cab/third';
const CREDENTIALS = {
  companyName: 'Web',
  clientID: 'webapp',
  clientSecret: 'XTdI790c598u21C',
};

async function getAccessKey() {
  const response = await fetch(`${API_BASE}/getAccessKey`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(CREDENTIALS),
  });
  const data = await response.json();
  return data.accessKey;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pickupCity = searchParams.get('from');
    
    if (!pickupCity) {
      return NextResponse.json({ cities: [], error: 'Missing pickup city' }, { status: 400 });
    }

    const accessKey = await getAccessKey();
    
    const response = await fetch(`${API_BASE}/getOnewayDropCityList`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pickupCityName: pickupCity,
        userName: 'Web',
        accessKey,
      }),
    });
    
    const data = await response.json();
    const cities = data['City Name'] || [];
    
    return NextResponse.json({ cities });
  } catch (error) {
    console.error('Error fetching drop cities:', error);
    return NextResponse.json({ cities: [], error: 'Failed to fetch cities' }, { status: 500 });
  }
}
