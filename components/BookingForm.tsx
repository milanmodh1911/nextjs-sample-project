'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, ArrowRight, Search, ChevronDown, X } from 'lucide-react';
import { SERVICE_TYPES, getBookingUrl, SITE_CONFIG } from '@/lib/constants';

interface City {
  cityName: string;
}

// Searchable City Dropdown Component
function CityDropdown({
  label,
  value,
  onChange,
  cities,
  isLoading,
  disabled,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (city: string) => void;
  cities: City[];
  isLoading: boolean;
  disabled?: boolean;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter cities based on search
  const filteredCities = cities.filter((city) =>
    city.cityName.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (cityName: string) => {
    onChange(cityName);
    setIsOpen(false);
    setSearch('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearch('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <MapPin className="w-4 h-4 inline mr-1 text-primary" />
        {label}
      </label>
      
      {/* Selected Value / Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`select-field w-full text-left flex items-center justify-between ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {isLoading ? 'Loading cities...' : value || placeholder}
        </span>
        <div className="flex items-center gap-1">
          {value && !disabled && (
            <X 
              className="w-4 h-4 text-gray-400 hover:text-gray-600" 
              onClick={handleClear}
            />
          )}
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-72 overflow-hidden" style={{ top: '100%' }}>
          {/* Search Input */}
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search city..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          {/* City List */}
          <div className="max-h-52 overflow-y-auto">
            {filteredCities.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {search ? 'No cities found' : 'No cities available'}
              </div>
            ) : (
              filteredCities.map((city) => (
                <button
                  key={city.cityName}
                  type="button"
                  onClick={() => handleSelect(city.cityName)}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-primary-50 transition-colors ${
                    value === city.cityName ? 'bg-primary-50 text-primary font-medium' : 'text-gray-700'
                  }`}
                >
                  {city.cityName}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingForm() {
  const [activeService, setActiveService] = useState('oneway');
  const [pickupCity, setPickupCity] = useState('');
  const [dropCity, setDropCity] = useState('');
  const [pickupCities, setPickupCities] = useState<City[]>([]);
  const [dropCities, setDropCities] = useState<City[]>([]);
  const [isLoadingPickup, setIsLoadingPickup] = useState(true);
  const [isLoadingDrop, setIsLoadingDrop] = useState(false);

  // Fetch pickup cities on mount
  useEffect(() => {
    async function fetchPickupCities() {
      setIsLoadingPickup(true);
      try {
        const response = await fetch('/api/cities/pickup');
        const data = await response.json();
        setPickupCities(data.cities || []);
      } catch (error) {
        console.error('Error fetching pickup cities:', error);
        setPickupCities([]);
      }
      setIsLoadingPickup(false);
    }
    fetchPickupCities();
  }, []);

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
        const response = await fetch(`/api/cities/drop?from=${encodeURIComponent(pickupCity)}`);
        const data = await response.json();
        setDropCities(data.cities || []);
      } catch (error) {
        console.error('Error fetching drop cities:', error);
        setDropCities([]);
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
    <div className="bg-white rounded-xl shadow-card">
      {/* Service Tabs */}
      <div className="flex flex-wrap bg-gray-500 rounded-t-xl">
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
            <CityDropdown
              label="Pick-up City"
              value={pickupCity}
              onChange={setPickupCity}
              cities={pickupCities}
              isLoading={isLoadingPickup}
              placeholder="Select Pick Up City"
            />
          </div>

          {/* Drop City */}
          <div className="md:col-span-5">
            <CityDropdown
              label="Drop City"
              value={dropCity}
              onChange={setDropCity}
              cities={dropCities}
              isLoading={isLoadingDrop}
              disabled={!pickupCity}
              placeholder={pickupCity ? 'Select Drop City' : 'Select pickup city first'}
            />
          </div>

          {/* Check Fare Button */}
          <div className="md:col-span-2">
            <button
              onClick={handleCheckFare}
              disabled={!pickupCity || !dropCity}
              className="btn-primary w-full h-[46px] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
