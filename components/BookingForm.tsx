'use client';

import { useState, useEffect } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { SERVICE_TYPES, getBookingUrl, SITE_CONFIG } from '@/lib/constants';

// Popular cities - loaded instantly, API fetches more in background
const POPULAR_CITIES = [
  'Ahmedabad', 'Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Surat', 
  'Vadodara', 'Jaipur', 'Chennai', 'Hyderabad', 'Indore', 'Bhopal',
  'Nashik', 'Nagpur', 'Rajkot', 'Udaipur', 'Chandigarh', 'Lucknow'
];

interface City {
  cityName: string;
}

export default function BookingForm() {
  const [activeService, setActiveService] = useState('oneway');
  const [pickupCity, setPickupCity] = useState('');
  const [dropCity, setDropCity] = useState('');
  const [pickupCities, setPickupCities] = useState<City[]>(
    POPULAR_CITIES.map(name => ({ cityName: name }))
  );
  const [dropCities, setDropCities] = useState<City[]>([]);
  const [isLoadingDrop, setIsLoadingDrop] = useState(false);

  // Fetch drop cities when pickup city changes
  useEffect(() => {
    async function fetchDropCities() {
      if (!pickupCity) {
        setDropCities([]);
        return;
      }
      
      setIsLoadingDrop(true);
      setDropCity('');
      
      try {
        // Get access key
        const accessResponse = await fetch('https://api.oneway.cab/third/getAccessKey', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyName: 'Web',
            clientID: 'webapp', 
            clientSecret: 'XTdI790c598u21C'
          }),
        });
        const accessData = await accessResponse.json();
        
        // Get drop cities
        const citiesResponse = await fetch('https://api.oneway.cab/third/getOnewayDropCityList', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pickupCityName: pickupCity,
            userName: 'Web',
            accessKey: accessData.accessKey,
          }),
        });
        const citiesData = await citiesResponse.json();
        setDropCities(citiesData['City Name'] || []);
      } catch (error) {
        console.error('Error fetching drop cities:', error);
        // Fallback to popular cities
        setDropCities(POPULAR_CITIES.filter(c => c !== pickupCity).map(name => ({ cityName: name })));
      }
      
      setIsLoadingDrop(false);
    }
    fetchDropCities();
  }, [pickupCity]);

  const handleCheckFare = () => {
    if (!pickupCity || !dropCity) {
      alert('Please select both pickup and drop city');
      return;
    }

    // Redirect to booking microsite
    const bookingUrl = getBookingUrl(pickupCity, dropCity);
    window.open(bookingUrl, '_blank');
  };

  const handleServiceClick = (serviceId: string, href: string) => {
    if (serviceId === 'oneway') {
      setActiveService(serviceId);
    } else {
      // Redirect to PHP site for other services
      window.location.href = `${SITE_CONFIG.url}${href}`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      {/* Service Tabs */}
      <div className="flex flex-wrap bg-gray-500">
        {SERVICE_TYPES.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceClick(service.id, service.href)}
            className={`service-tab flex-1 min-w-[120px] ${
              activeService === service.id
                ? 'service-tab-active'
                : 'service-tab-inactive'
            }`}
          >
            {service.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Pickup City */}
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1 text-primary" />
              Pick-up City
            </label>
            <select
              value={pickupCity}
              onChange={(e) => setPickupCity(e.target.value)}
              className="select-field"
            >
              <option value="">Select Pick Up City</option>
              {pickupCities.map((city) => (
                <option key={city.cityName} value={city.cityName}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </div>

          {/* Drop City */}
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1 text-primary" />
              Drop City
            </label>
            <select
              value={dropCity}
              onChange={(e) => setDropCity(e.target.value)}
              className="select-field"
              disabled={!pickupCity || isLoadingDrop}
            >
              <option value="">
                {!pickupCity
                  ? 'Select pickup city first'
                  : isLoadingDrop
                  ? 'Loading cities...'
                  : 'Select Drop City'}
              </option>
              {dropCities.map((city) => (
                <option key={city.cityName} value={city.cityName}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </div>

          {/* Check Fare Button */}
          <div className="md:col-span-2">
            <button
              onClick={handleCheckFare}
              disabled={!pickupCity || !dropCity}
              className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Check Fare</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
