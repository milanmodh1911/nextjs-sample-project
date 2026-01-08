import { API_CONFIG } from './constants';

// Types
export interface City {
  cityName: string;
  cityId?: string;
}

export interface AccessKeyResponse {
  accessKey: string;
  status?: string;
}

export interface CityListResponse {
  'City Name': City[];
}

// Get Access Key
async function getAccessKey(): Promise<string> {
  const response = await fetch(`${API_CONFIG.baseUrl}/getAccessKey`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(API_CONFIG.credentials),
  });

  const data: AccessKeyResponse = await response.json();
  return data.accessKey;
}

// Get Pickup Cities
export async function getPickupCities(): Promise<City[]> {
  try {
    const accessKey = await getAccessKey();
    
    const response = await fetch(`${API_CONFIG.baseUrl}/getOnewayPickupCityList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: 'Web',
        accessKey,
      }),
    });

    const data: CityListResponse = await response.json();
    return data['City Name'] || [];
  } catch (error) {
    console.error('Error fetching pickup cities:', error);
    return [];
  }
}

// Get Drop Cities based on Pickup City
export async function getDropCities(pickupCity: string): Promise<City[]> {
  try {
    const accessKey = await getAccessKey();
    
    const response = await fetch(`${API_CONFIG.baseUrl}/getOnewayDropCityList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pickupCityName: pickupCity,
        userName: 'Web',
        accessKey,
      }),
    });

    const data: CityListResponse = await response.json();
    return data['City Name'] || [];
  } catch (error) {
    console.error('Error fetching drop cities:', error);
    return [];
  }
}

// Get Route Details
export interface RouteDetail {
  CarType: string;
  BaseFare: number;
  TollTaxAmount: number;
  duration: string;
  distance?: string;
}

export interface RouteDetailsResponse {
  listofvalue: RouteDetail[];
}

export async function getRouteDetails(fromCity: string, toCity: string): Promise<RouteDetail[]> {
  try {
    const accessKey = await getAccessKey();
    
    const response = await fetch(`${API_CONFIG.baseUrl}/webOnewayDetail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fromCityName: fromCity,
        toCityName: toCity,
        userName: 'WEB',
        accessKey,
      }),
    });

    const data: RouteDetailsResponse = await response.json();
    return data.listofvalue || [];
  } catch (error) {
    console.error('Error fetching route details:', error);
    return [];
  }
}

// ---------- Local Package Types ----------

// City list (already compatible with City interface)
export interface LocalPackageCity {
  cityId: number;
  cityName: string;
  stateName?: string;
  cityLatitude?: string;
  cityLongitude?: string;
  isDeleted?: number;
  stateId?: number;
}

// Cars info
export interface LocalPackageCar {
  noOfBags: number;
  noOfPersons: number;
}

export interface LocalPackageCars {
  [carType: string]: LocalPackageCar;
}

// Fare details
export interface LocalPackageFare {
  fareId: number;
  carType: string;
  carTypeId: number;
  baseFareAmount: number;
  serviceTax: string;
  gstAmount: number;
  journeyHour: number;
  journeyKilometer: number;
  extraKilometerCharge: number;
  extraHourCharge: number;
  isAdvanceBookingAllow: number;
}

// Sub package
export interface LocalSubPackage {
  subPackageId: number;
  subPackageName: string;
  subPackageFare: LocalPackageFare[];
}

// Full detail response
export interface LocalPackageDetailResponse {
  cars: LocalPackageCars;
  packageList: LocalSubPackage[];
}

// Get Local Package Cities
export async function getLocalPackageCities(): Promise<LocalPackageCity[]> {
  try {
    const accessKey = await getAccessKey();

    const response = await fetch(
      `${API_CONFIG.baseUrl}/webLocalPackageList`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: 'Web',
          accessKey,
        }),
      }
    );

    const data = await response.json();
    return data.cityList || [];

  } catch (error) {
    console.error('Error fetching local package cities:', error);
    return [];
  }
}

// Get Local Package Details by City
export async function getLocalPackageDetails(
  cityName: string
): Promise<LocalPackageDetailResponse | null> {
  try {
    const accessKey = await getAccessKey();

    const response = await fetch(
      `${API_CONFIG.baseUrl}/webLocalPackageListDetail`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: 'Web',
          accessKey,
          cityName,
        }),
      }
    );

    const data: LocalPackageDetailResponse = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching local package details:', error);
    return null;
  }
}


