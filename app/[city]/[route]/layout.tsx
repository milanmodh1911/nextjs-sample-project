import { Metadata } from 'next';

// Helper function to format city name from slug
function formatCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to parse route slug
function parseRouteSlug(routeSlug: string): { from: string; to: string } | null {
  const match = routeSlug.match(/^(.+)-to-(.+)-(taxi|cab)$/);
  if (match) {
    return {
      from: formatCityName(match[1]),
      to: formatCityName(match[2]),
    };
  }
  return null;
}

type Props = {
  params: { city: string; route: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const routeInfo = parseRouteSlug(params.route);
  
  if (!routeInfo) {
    return {
      title: 'Route Not Found | OneWay.Cab',
    };
  }

  const { from, to } = routeInfo;

  return {
    title: `${from} to ${to} One Way Cab, Taxi, Car Rental | OneWay.Cab`,
    description: `Book ${from} to ${to} one way cab at affordable rates. Fixed fare, no extra km charges, 24x7 support. Instant confirmation. Book now!`,
    keywords: [
      `${from} to ${to} cab`,
      `${from} to ${to} taxi`,
      `${from} to ${to} one way`,
      `${from} to ${to} car rental`,
      `one way cab ${from} ${to}`,
      `taxi from ${from} to ${to}`,
    ],
    openGraph: {
      title: `${from} to ${to} One Way Cab | OneWay.Cab`,
      description: `Book ${from} to ${to} one way cab at affordable rates. Fixed fare, no extra km charges, 24x7 support.`,
      url: `https://oneway.cab/${params.city}/${params.route}`,
      siteName: 'OneWay.Cab',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${from} to ${to} One Way Cab | OneWay.Cab`,
      description: `Book ${from} to ${to} one way cab at affordable rates. Fixed fare, no extra km charges.`,
    },
    alternates: {
      canonical: `https://oneway.cab/${params.city}/${params.route}`,
    },
  };
}

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
