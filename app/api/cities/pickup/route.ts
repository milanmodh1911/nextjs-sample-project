import { NextResponse } from 'next/server';

const API_BASE = 'https://webapi.oneway.cab/third';
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

export async function GET() {
  try {
    const accessKey = await getAccessKey();
    
    const response = await fetch(`${API_BASE}/getPickupCityListPriority`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'Web',
        accessKey,
      }),
    });
    
    const data = await response.json();
    const cities = data['City Name'] || [];
    
    return NextResponse.json({ cities });
  } catch (error) {
    console.error('Error fetching pickup cities:', error);
    return NextResponse.json({ cities: [], error: 'Failed to fetch cities' }, { status: 500 });
  }
}
