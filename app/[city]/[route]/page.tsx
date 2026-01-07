'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { MapPin, Calendar, Clock, ChevronRight, Phone, DollarSign, Shield, Headphones, Ban } from 'lucide-react';
import { SITE_CONFIG, getBookingUrl } from '@/lib/constants';

// Helper function to format city name from slug
function formatCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to parse route slug
function parseRouteSlug(routeSlug: string): { from: string; to: string } | null {
  // Pattern: {from}-to-{to}-taxi or {from}-to-{to}-cab
  const match = routeSlug.match(/^(.+)-to-(.+)-(taxi|cab)$/);
  if (match) {
    return {
      from: formatCityName(match[1]),
      to: formatCityName(match[2]),
    };
  }
  return null;
}

// Benefits data
const BENEFITS = [
  {
    icon: DollarSign,
    title: 'All-inclusive fixed fare',
    getDescription: (from: string, to: string) =>
      `OneWay.Cab offers an all-inclusive fixed fare for its ${from} to ${to} cab service, which includes toll taxes and other charges. This ensures that users know the exact fare for their journey upfront and do not have to worry about any additional charges.`,
  },
  {
    icon: MapPin,
    title: 'No Extra km Charges',
    getDescription: (from: string, to: string) =>
      `OneWay.Cab does not charge users for any additional kilometers traveled during the journey. This means that users can travel to ${to} from ${from} without having to worry about any extra charges.`,
  },
  {
    icon: Shield,
    title: 'Assured cab',
    getDescription: (from: string, to: string) =>
      `OneWay.Cab provides an assured cab to its users, ensuring that the cab arrives at their doorstep at the scheduled time. This adds to the safety and security of the journey.`,
  },
  {
    icon: Headphones,
    title: '24x7 customer support',
    getDescription: (from: string, to: string) =>
      `OneWay.Cab offers 24x7 customer support to its users, ensuring that they can get in touch with us for any queries or concerns.`,
  },
  {
    icon: Ban,
    title: 'Zero cancellation charges',
    getDescription: (from: string, to: string) =>
      `OneWay.Cab does not charge any cancellation fees if users decide to cancel their booking. This makes it a flexible and convenient option for travelers.`,
  },
];

// Sample other destinations (in real app, fetch from API)
const getOtherDestinations = (city: string) => [
  { name: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Ahmedabad Airport', state: 'Gujarat' },
  { name: 'Anand', state: 'Gujarat' },
  { name: 'Bopal', state: 'Gujarat' },
  { name: 'Vadodara', state: 'Gujarat' },
];

export default function RoutePage() {
  const params = useParams();
  const citySlug = params.city as string;
  const routeSlug = params.route as string;

  // Parse route info
  const routeInfo = parseRouteSlug(routeSlug);
  
  if (!routeInfo) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Invalid Route</h1>
        <p className="text-gray-600 mt-2">The route URL format is incorrect.</p>
        <Link href="/" className="btn-primary mt-4 inline-block">
          Go to Homepage
        </Link>
      </div>
    );
  }

  const { from, to } = routeInfo;
  const fromSlug = citySlug;
  const toSlug = routeSlug.match(/^.+-to-(.+)-(taxi|cab)$/)?.[1] || '';

  // Form state
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('10:00');

  const handleCheckFare = () => {
    const bookingUrl = getBookingUrl(from, to);
    window.open(bookingUrl, '_blank');
  };

  // Other destinations from both cities
  const fromDestinations = getOtherDestinations(from);
  const toDestinations = getOtherDestinations(to);

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="container-custom py-3">
          <nav className="flex items-center text-sm text-gray-600 flex-wrap gap-1">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/routes" className="hover:text-primary">Routes</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/city/${fromSlug}`} className="hover:text-primary">{from}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-800">{from} to {to} Cab</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gray-50 py-8">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            One Way Trip From {from} To {to}
          </h1>

          {/* Booking Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Pickup */}
              <div className="md:col-span-3">
                <label className="block text-xs text-gray-500 mb-1">PICKUP</label>
                <div className="input-field bg-gray-50 text-gray-800 font-medium">
                  {from.toLowerCase()}
                </div>
              </div>

              {/* Drop */}
              <div className="md:col-span-3">
                <label className="block text-xs text-gray-500 mb-1">DROP</label>
                <div className="input-field bg-gray-50 text-gray-800 font-medium">
                  {to.toLowerCase()}
                </div>
              </div>

              {/* Date */}
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  DATE
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                />
              </div>

              {/* Time */}
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">
                  <Clock className="w-3 h-3 inline mr-1" />
                  TIME
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Check Fare Button */}
              <div className="md:col-span-2">
                <button
                  onClick={handleCheckFare}
                  className="w-full h-[46px] bg-accent hover:bg-accent-600 text-gray-900 font-semibold rounded-lg transition-colors"
                >
                  Check Fare
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Content */}
      <section className="py-10 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              One Way Cab provides One Way Car Rental from {from} to {to}, which includes the pick from anywhere in {from} including city / {from} Airport and drop off to {to} City. We provide instant confirmation and flexibility to book 24x7.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              One Way Taxi from {from} to {to} is the best option for travelers who would like to travel one way only from {from} to {to}. Cab/Taxi would easily pick you up and drop you at your preferred location anywhere in {to}. It is not a shared Cab. It will be a dedicated cab for you.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {from} to {to} one way car rental packages are designed in such a way, so user could avail more benefits by just paying one way drop off charges. So why to wait more, hurry up, you are just few step away to grab this deal.
            </p>
            <p className="text-gray-700">
              There are many <Link href="/advantages" className="text-primary hover:underline">reasons</Link> for using OneWay.Cab
            </p>
          </div>
        </div>
      </section>

      {/* Why Book Section */}
      <section className="py-10 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            Why should I book a taxi from {from} to {to} with OneWay.Cab ?
          </h2>
          <p className="text-gray-600 mb-8">
            There are several reasons why you should book a cab from {from} to {to} with One Way.cab. Here are some of the key benefits:
          </p>

          <div className="space-y-6">
            {BENEFITS.map((benefit, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-20 h-20 bg-accent rounded-lg flex-shrink-0 flex items-center justify-center">
                  <benefit.icon className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.getDescription(from, to)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="mt-8 p-6 bg-white rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              In conclusion, OneWay.Cab is a reliable and convenient option for those looking to book a cab from {from} to {to}. We offer an all-inclusive fixed fare, assured cab, and 24x7 customer support, ensuring a hassle-free travel experience for its users. So, book your cab today and enjoy a comfortable and convenient journey from {from} to {to}!
            </p>
          </div>
        </div>
      </section>

      {/* Additional SEO Content */}
      <section className="py-10 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              OneWay.cab provides cab services from {from} to {to}. This service allows travelers to book a one-way cab from {from} to {to} at a fixed, all-inclusive fare. The platform offers a range of vehicles to choose from, including hatchbacks, sedans, and SUVs, depending on the user's needs and preferences.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The cab service from {from} to {to} is a convenient option for people traveling to {to} from {from} for business or leisure. OneWay.cab ensures that the cab arrives at the user's doorstep at the scheduled time, ensuring a hassle-free experience. Additionally, the platform provides 24x7 customer support to assist users with their queries and concerns.
            </p>
          </div>
        </div>
      </section>

      {/* App Download */}
      <section className="py-10 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.onewaycab.booking"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                width={160}
                height={48}
                className="h-12 w-auto"
              />
            </a>
            <a
              href="https://apps.apple.com/app/oneway-cab/id1456348290"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="Download on the App Store"
                width={160}
                height={48}
                className="h-12 w-auto"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Other Destinations */}
      <section className="py-10 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* From City */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-primary">
                  Other Destination from {from}
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  {fromDestinations.slice(0, 5).map((dest, index) => (
                    <li key={index}>
                      <Link
                        href={`/${fromSlug}/${fromSlug}-to-${dest.name.toLowerCase().replace(/\s+/g, '-')}-taxi`}
                        className="text-primary hover:underline"
                      >
                        • {dest.name}, {dest.state}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/city/${fromSlug}`}
                  className="text-primary hover:underline text-sm mt-4 inline-block"
                >
                  Check More..
                </Link>
              </div>
            </div>

            {/* To City */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-primary">
                  Other Destination from {to}
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  {toDestinations.slice(0, 5).map((dest, index) => (
                    <li key={index}>
                      <Link
                        href={`/${toSlug}/${toSlug}-to-${dest.name.toLowerCase().replace(/\s+/g, '-')}-taxi`}
                        className="text-primary hover:underline"
                      >
                        • {dest.name}, {dest.state}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/city/${toSlug}`}
                  className="text-primary hover:underline text-sm mt-4 inline-block"
                >
                  Check More..
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
