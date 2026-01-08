'use client';
import React, { useState, useEffect } from 'react';
import { SERVICE_TYPES, getBookingUrl, SITE_CONFIG } from '@/lib/constants';
import ServiceTabsWithTagline from '@/components/ServiceTabsWithTagline';

interface City {
  cityId: number;
  cityName: string;
  stateName: string;
  cityLatitude: string;
  cityLongitude: string;
  stateId: number;
  isDeleted: number;
}

interface CarInfo {
  noOfBags: number;
  noOfPersons: number;
}

interface FareDetail {
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

interface Package {
  subPackageId: number;
  subPackageName: string;
  subPackageFare: FareDetail[];
}

const CarRentalPage = () => {
  const [activeService, setActiveService] = useState('local');
  const [pickupCity, setPickupCity] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<number | ''>('');
  const [selectedCarType, setSelectedCarType] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [cars, setCars] = useState<Record<string, CarInfo>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFareDetails, setShowFareDetails] = useState(false);

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (pickupCity) {
      const selectedCity = cities.find(c => c.cityId.toString() === pickupCity);
      if (selectedCity) {
        fetchPackages(selectedCity.cityName);
      }
    } else {
      setPackages([]);
      setCars({});
      setSelectedPackage('');
      setSelectedCarType('');
      setShowFareDetails(false);
    }
  }, [pickupCity]);

  const fetchCities = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/local-package/cities');

      if (!response.ok) throw new Error('Failed to fetch cities');

      const data = await response.json();

      if (data.success && data.cities) {
        setCities(data.cities);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError('Failed to load cities. Please try again.');
      console.error('Error fetching cities:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async (cityName: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`/api/local-package/details?cityName=${encodeURIComponent(cityName)}`);

      if (!response.ok) throw new Error('Failed to fetch packages');

      const data = await response.json();

      if (data.success) {
        setPackages(data.packages || []);
        setCars(data.cars || {});
      } else {
        setPackages([]);
        setCars({});
      }
    } catch (err) {
      setError('Failed to load packages. Please try again.');
      console.error('Error fetching packages:', err);
      setPackages([]);
      setCars({});
    } finally {
      setLoading(false);
    }
  };

  const handleCheckFare = () => {
    if (!pickupCity || !selectedPackage) {
      setError('Please select both city and package');
      return;
    }

    setShowFareDetails(true);
    setError('');
  };

  const getSelectedPackageData = () => {
    return packages.find(p => p.subPackageId === selectedPackage);
  };

  const getSelectedFareDetail = () => {
    const pkg = getSelectedPackageData();
    if (!pkg || !selectedCarType) return null;
    return pkg.subPackageFare.find(f => f.carType === selectedCarType);
  };

  const calculateTotalFare = (fare: FareDetail) => {
    return fare.baseFareAmount + fare.gstAmount;
  };

  const handleServiceClick = (serviceId: string, href: string) => {
    if (serviceId === 'local') {
      setActiveService(serviceId);
    } else {
      // Redirect to PHP site for other services
      window.location.href = `${SITE_CONFIG.url}${href}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-md">

          {/* Service Tabs - Pill Style */}
          <div className="flex flex-wrap justify-center gap-2 p-4 bg-gray-50 rounded-t-xl">
            {SERVICE_TYPES.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.id, service.href)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeService === service.id
                  ? 'bg-accent text-gray-900 shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                  }`}
              >
                {service.label}
              </button>
            ))}
          </div>

          {/* Tagline */}
          {/* <div className="text-center py-3 border-b border-gray-100">
            <p className="text-gray-700 font-medium">
              Taxi-Rental Service for One Way Inter-City Travel!
            </p>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
            {/* Pickup City */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                PICKUP
              </label>
              <select
                value={pickupCity}
                onChange={(e) => {
                  setPickupCity(e.target.value);
                  setShowFareDetails(false);
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                disabled={loading}
              >
                <option value="">Select Pick-up City</option>
                {cities.map((city) => (
                  <option key={city.cityId} value={city.cityId}>
                    {city.cityName} - {city.stateName}
                  </option>
                ))}
              </select>
            </div>

            {/* Package Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                PACKAGE
              </label>
              <select
                value={selectedPackage}
                onChange={(e) => {
                  setSelectedPackage(e.target.value ? Number(e.target.value) : '');
                  setSelectedCarType('');
                  setShowFareDetails(false);
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none disabled:opacity-50"
                disabled={loading || !pickupCity}
              >
                <option value="">Select Package</option>
                {packages.map((pkg) => (
                  <option key={pkg.subPackageId} value={pkg.subPackageId}>
                    {pkg.subPackageName}
                  </option>
                ))}
              </select>
            </div>

            {/* Check Fare Button */}
            <div className="flex items-end">
              <button
                onClick={handleCheckFare}
                className="w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !pickupCity || !selectedPackage}
              >
                {loading ? 'Loading...' : 'Check Fare'}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {/* Fare Details Display */}
          {showFareDetails && selectedPackage && (
            <div className="gap-6 p-6 md:p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Available Cars for {getSelectedPackageData()?.subPackageName}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getSelectedPackageData()?.subPackageFare.map((fare) => {
                  const carInfo = cars[fare.carType];
                  const totalFare = calculateTotalFare(fare);

                  return (
                    <div
                      key={fare.fareId}
                      onClick={() => setSelectedCarType(fare.carType)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedCarType === fare.carType
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 hover:border-yellow-300'
                        }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{fare.carType}</h4>
                          {carInfo && (
                            <p className="text-sm text-gray-600">
                              {carInfo.noOfPersons} Persons • {carInfo.noOfBags} Bags
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">₹{totalFare}</p>
                          <p className="text-xs text-gray-500">Total</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Base Fare:</span>
                          <span className="font-semibold">₹{fare.baseFareAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">GST ({fare.serviceTax}%):</span>
                          <span className="font-semibold">₹{fare.gstAmount}</span>
                        </div>
                        {fare.journeyHour > 0 && (
                          <div className="flex justify-between text-gray-600">
                            <span>Duration:</span>
                            <span>{fare.journeyHour} Hrs</span>
                          </div>
                        )}
                        {fare.journeyKilometer > 0 && (
                          <div className="flex justify-between text-gray-600">
                            <span>Distance:</span>
                            <span>{fare.journeyKilometer} KMs</span>
                          </div>
                        )}
                        {fare.extraKilometerCharge > 0 && (
                          <div className="flex justify-between text-xs text-gray-500 mt-2 pt-2 border-t">
                            <span>Extra KM:</span>
                            <span>₹{fare.extraKilometerCharge}/km</span>
                          </div>
                        )}
                        {fare.extraHourCharge > 0 && (
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Extra Hour:</span>
                            <span>₹{fare.extraHourCharge}/hr</span>
                          </div>
                        )}
                      </div>

                      {selectedCarType === fare.carType && (
                        <button className="w-full mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors">
                          Book Now
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* App Download Section */}
        <div className="bg-gray-100 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <span className="text-gray-700 font-medium">Download our app:</span>
            <div className="flex gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-12 cursor-pointer hover:opacity-80 transition-opacity"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="Download on the App Store"
                className="h-12 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Local Car Hire Packages
          </h2>

          <p className="text-gray-700 mb-6">
            OneWay.Cab also provides Local Car Hire Packages for your travel need in-side the city.
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2 font-bold">•</span>
              <span className="text-gray-700">Are you planning to attend multiple meetings in the city in just few hours?</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2 font-bold">•</span>
              <span className="text-gray-700">City Car Rental / Radio Car Rental is not available in the suburbs you are planning to travel?</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2 font-bold">•</span>
              <span className="text-gray-700">Traveling on tight schedule?</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-2 font-bold">•</span>
              <span className="text-gray-700">Not Sure, if requested City Car Rental / Radio Car Rental will arrive or arrive on time?</span>
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            Then, you can Hire a Car for Local Car Rental package like 6 Hrs / 60 KMs with OneWay.Cab and rest assured your rental cab will be with you for 6 hrs and 60 KMs will be available with you. Car Rental package can be extended based on your flexible planning at nominal extra fare.
          </p>

          <p className="text-gray-900 font-semibold mb-4">
            Last thing you want to worry among your busy schedule is Car Rental!
          </p>

          <p className="text-gray-700">
            You can also book via Android as well as iPhone app.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-400 pb-2">Gujarat</h3>
            <ul className="space-y-2">
              {['Taxi in Ahmedabad', 'Taxi in Anand', 'Taxi in Rajkot', 'Taxi in Gandhinagar', 'Taxi in Vadodara', 'Taxi in Bharuch', 'Taxi in Vapi', 'Taxi in Ankleshwar', 'Taxi in Dahej', 'Taxi in Surat', 'Taxi in Navsari', 'Taxi in Bhavnagar', 'Taxi in Jamnagar', 'Taxi in Junagardh', 'Taxi in Gandhidham', 'Taxi in Nadiad', 'Taxi in Morbi', 'Taxi in SurenderNagar', 'Taxi in Mehsana', 'Taxi in Bhuj', 'Taxi in Valsad', 'Taxi in Amreli'].map((city, index) => (
                <li key={index} className="text-gray-700 text-sm hover:text-yellow-500 cursor-pointer transition-colors">
                  {city}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-400 pb-2">Maharashtra</h3>
            <ul className="space-y-2">
              {['Taxi in Mumbai', 'Taxi in Pune', 'Taxi in Nagpur', 'Taxi in Thane', 'Taxi in Nashik', 'Taxi in Aurangabad', 'Taxi in Navi Mumbai', 'Taxi in Solapur', 'Taxi in Amravati', 'Taxi in Kolhapur', 'Taxi in Jalgaon', 'Taxi in Akola', 'Taxi in Ahmednagar'].map((city, index) => (
                <li key={index} className="text-gray-700 text-sm hover:text-yellow-500 cursor-pointer transition-colors">
                  {city}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-yellow-400 pb-2">Rajasthan</h3>
            <ul className="space-y-2">
              {['Taxi in Ajmer', 'Taxi in Jaipur', 'Taxi in Udaipur', 'Taxi in Kota', 'Taxi in Jodhpur', 'Taxi in Bharatpur', 'Taxi in Bikaner', 'Taxi in Jaisalmer', 'Taxi in Bhilwara', 'Taxi in Barmer', 'Taxi in Alwar'].map((city, index) => (
                <li key={index} className="text-gray-700 text-sm hover:text-yellow-500 cursor-pointer transition-colors">
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CarRentalPage;