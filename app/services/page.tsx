import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MapPin, Shield, Navigation, DollarSign, Eye, Car, Home, Wrench, FileText, CreditCard, Star, Heart, Ban } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Why OneWay.Cab? | Services | OneWay.Cab',
  description: 'Discover why OneWay.Cab is India\'s leading one-way inter-city cab service. 24x7 helpline, no extra KMs charge, assured cab, GPS enabled, fixed fare & more.',
};

const FEATURES = [
  {
    icon: Phone,
    title: '24x7 Helpline',
    description: 'Available to help you at any moment: 08000247247',
  },
  {
    icon: MapPin,
    title: 'No Extra KMs Charge',
    description: 'We do not charge based on KMs. There is no extra KMs Fare applicable. Get Peace of Mind, so that driver doesn\'t overcharge you by taking a detour.',
  },
  {
    icon: Shield,
    title: 'Assured Cab',
    description: 'If you have Booking Confirmation, rest assured you will get cab.',
  },
  {
    icon: Navigation,
    title: 'GPS Enabled',
    description: 'Each Cab is GPS Enabled. Now Track Cab as they arrive to pick you up.',
  },
  {
    icon: DollarSign,
    title: 'Fixed Fare',
    description: 'There is no additional charge apart from Service Tax & One Way Toll-Tax which are Government Mandated Taxes. Our Fares is all inclusive except Taxes.',
  },
  {
    icon: Eye,
    title: 'Transparent Pricing',
    description: 'We will show taxes (Service Tax & One-Way Toll Tax before booking of ride). You only pay what you see before booking, no other charges.',
  },
  {
    icon: Car,
    title: 'Dedicated Cab',
    description: 'Just for you - no sharing with other passengers.',
  },
  {
    icon: Home,
    title: 'Home Pickup & Drop',
    description: 'Your pick-up address can be anywhere in pick-up city and drop address can be anywhere in destination city including Airport.',
  },
  {
    icon: Wrench,
    title: 'Backup Cab & Roadside Assistance',
    description: 'Available in case of any operational issue en-route.',
  },
  {
    icon: FileText,
    title: 'Automatic Instant Invoice',
    description: 'At the end of journey on your registered email address.',
  },
  {
    icon: CreditCard,
    title: 'No Advance Payment',
    description: 'Required for booking of Cab.',
  },
  {
    icon: Shield,
    title: 'On-Time Cab',
    description: 'Using Predictive Algorithm using GPS and Traffic Conditions, each cab is tracked for On-Time Arrival. We ensure cab arrives on time at your pick-up destination.',
  },
  {
    icon: Ban,
    title: 'Zero Cancellation Charges',
    description: 'We know plans change. Cancel any moment – no obligations, no cancellation charge.',
  },
  {
    icon: CreditCard,
    title: 'Multi Payment Options',
    description: 'By Cash at the end of Journey or Pre-Pay via Net-Banking, Credit Card, PayTM wallet plus many more.',
  },
  {
    icon: Star,
    title: 'Best Rated Drivers',
    description: 'All our Drivers have commercial driving license which are specialized for highway driving. We rank each driver on 8+ parameters including Customer Satisfaction, On-Time Arrival.',
  },
  {
    icon: Heart,
    title: 'Safe & Convenient Ride',
    description: 'Enabled via our specialized experience enabled by our tech platform.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-primary text-white py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold">Why OneWay.Cab?</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-8 bg-white">
        <div className="container-custom">
          <p className="text-gray-700 mb-2">Have you travelled one-way from one city to another, and paid both way charges?</p>
          <p className="text-gray-700 mb-2"><strong>OneWay.Cab is India's Leading One-Way Inter City Cab Service Provider.</strong></p>
          <p className="text-gray-700 mb-2">Now when you travel one-way inter-city, you pay one-way.</p>
          <p className="text-gray-700">
            We are present in 46+ Cities and provide OneWayCab services on 468+ Routes. 
            Check all available <Link href="/routes" className="text-primary hover:underline">Routes</Link> here. 
            Trusted by 98,000+ Customers.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-8 bg-white">
        <div className="container-custom text-center">
          <p className="text-gray-700 mb-6">We also provide Local Car Rental Hourly Packages and Outstation Cabs.</p>
          
          {/* App Download */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href={`${SITE_CONFIG.url}/redirect.php?url=android`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <div className="bg-black text-white rounded-lg px-4 py-2 flex items-center space-x-3 min-w-[180px]">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div>
                  <div className="text-xs text-gray-400">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </div>
            </a>
            <a
              href={`${SITE_CONFIG.url}/redirect.php?url=iphone`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <div className="bg-black text-white rounded-lg px-4 py-2 flex items-center space-x-3 min-w-[180px]">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                </svg>
                <div>
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </div>
            </a>
          </div>

          <p className="text-gray-700">
            Want to know more <Link href="/about-us" className="text-primary hover:underline">about us</Link>?
          </p>
        </div>
      </section>
    </>
  );
}
