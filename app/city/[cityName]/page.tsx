'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

// Helper function to format city name from slug
function formatCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Sample destinations (in real app, fetch from API)
const getDestinations = (city: string) => [
  { name: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Mumbai', state: 'Maharashtra' },
  { name: 'Delhi', state: 'Delhi' },
  { name: 'Pune', state: 'Maharashtra' },
  { name: 'Surat', state: 'Gujarat' },
  { name: 'Vadodara', state: 'Gujarat' },
  { name: 'Jaipur', state: 'Rajasthan' },
  { name: 'Udaipur', state: 'Rajasthan' },
];

export default function CityPage() {
  const params = useParams();
  const citySlug = params.cityName as string;
  const cityName = formatCityName(citySlug);
  const destinations = getDestinations(cityName);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-12">
        <div className="container-custom">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-primary-100">One Way Cab from</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {cityName} Outstation Cabs
          </h1>
          <p className="text-primary-100 max-w-2xl">
            Book one way taxi from {cityName} to any city at affordable rates. Fixed fare, no extra km charges, 24x7 customer support.
          </p>
        </div>
      </section>

      {/* Routes from this City */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Popular Routes from {cityName}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {destinations.map((dest, index) => (
              <Link
                key={index}
                href={`/${citySlug}/${citySlug}-to-${dest.name.toLowerCase().replace(/\s+/g, '-')}-taxi`}
                className="flex items-center justify-between p-4 border rounded-lg hover:border-primary hover:bg-primary-50 transition-all group"
              >
                <div>
                  <p className="font-medium text-gray-800 group-hover:text-primary">
                    {cityName} to {dest.name}
                  </p>
                  <p className="text-sm text-gray-500">{dest.state}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About City */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            About {cityName} Cab Service
          </h2>
          <div className="prose prose-gray max-w-none">
            <p>
              OneWay.Cab offers reliable and affordable one-way cab services from {cityName} to all major cities. Whether you're traveling for business or leisure, our professional drivers ensure a comfortable and safe journey.
            </p>
            <p>
              With our transparent pricing, you pay only for the distance you travel - no return fare, no hidden charges. Book your one-way taxi from {cityName} today and experience the best intercity travel service.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
