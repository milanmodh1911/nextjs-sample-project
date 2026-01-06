// Site Configuration
export const SITE_CONFIG = {
  name: 'OneWay.Cab',
  tagline: "India's Leading OneWay Inter-City Cab Provider",
  description: "India's Leading One Way Inter-City Cab Service provider. Why pay for return journey, if you are traveling one-way.",
  phone: '08000 247 247',
  whatsapp: '8000 247 247',
  email: 'support@oneway.cab',
  url: 'https://oneway.cab',
  bookingUrl: 'https://book.oneway.cab',
};

// API Configuration
export const API_CONFIG = {
  baseUrl: 'https://api.oneway.cab/third',
  credentials: {
    companyName: 'Web',
    clientID: 'webapp',
    clientSecret: 'XTdI790c598u21C',
  },
};

// Booking URL Generator
export const getBookingUrl = (from: string, to: string) => {
  const fromSlug = from.toLowerCase().replace(/\s+/g, '-');
  const toSlug = to.toLowerCase().replace(/\s+/g, '-');
  return `${SITE_CONFIG.bookingUrl}/check/${fromSlug}/${toSlug}`;
};

// Navigation Links
export const NAV_LINKS = [
  { label: 'Book Cab', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Routes', href: '/routes' },
  { label: 'Fare', href: '/fare' },
  { label: 'Corporate', href: '/corporate' },
  { label: 'Reviews', href: '/testimonials' },
  { label: 'Help', href: 'https://onewaycab1.freshdesk.com', external: true },
  { label: 'My Profile', href: 'https://book.oneway.cab/login', external: true },
];

// Footer Links
export const FOOTER_LINKS = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Why OneWay Cab', href: '/advantages' },
    { label: 'Services', href: '/services' },
    { label: 'Fare', href: '/fare' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Testimonials', href: '/testimonials' },
  ],
  secondary: [
    { label: 'Our Customers', href: '/our-customers' },
    { label: 'Routes', href: '/routes' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Vendor Registration', href: '/vendor' },
  ],
  popularRoutes: [
    { label: 'Vadodara to Ahmedabad', from: 'Vadodara', to: 'Ahmedabad' },
    { label: 'Surat to Mumbai', from: 'Surat', to: 'Mumbai' },
    { label: 'Pune to Mumbai', from: 'Pune', to: 'Mumbai' },
    { label: 'Delhi to Jaipur', from: 'Delhi', to: 'Jaipur' },
    { label: 'Indore to Bhopal', from: 'Indore', to: 'Bhopal' },
    { label: 'Mumbai to Nashik', from: 'Mumbai', to: 'Nashik' },
  ],
};

// Social Links
export const SOCIAL_LINKS = [
  { name: 'Facebook', url: 'https://www.facebook.com/onewaycab', icon: 'facebook' },
  { name: 'Twitter', url: 'https://twitter.com/OneWayCab', icon: 'twitter' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/one-way-cab', icon: 'linkedin' },
];

// Service Types
export const SERVICE_TYPES = [
  { id: 'oneway', label: 'One Way Taxi', href: '/', active: true },
  { id: 'local', label: 'Local', href: '/car-rental' },
  { id: 'roundtrip', label: 'Round Trip', href: '/outstation' },
  { id: 'special', label: 'Special Package', href: '/special-package' },
];

// USP Features
export const USP_FEATURES = [
  {
    icon: 'car',
    title: 'Return Fare, Not Fair!',
    description: "Why Pay for Return Journey when you are travelling one-way? Now get discounted AC Taxi for your one-way travel.",
  },
  {
    icon: 'thumbs-up',
    title: '2,50,000+ Trips Completed',
    description: '99% of our guest have never missed the flight. We take pride in our On-time performance.',
  },
  {
    icon: 'users',
    title: '98,000+ Customers',
    description: 'Over 98,000+ customers trust us, including top companies like GE, L&T, Bajaj Allianz, etc. Our cabs meet high service standards.',
  },
];

// Analytics IDs
export const ANALYTICS = {
  googleAnalytics: 'UA-44427050-2',
  googleTagManager: 'GTM-PXCX28C',
  facebookPixel: '905067014695257',
};
