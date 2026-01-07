import { Metadata } from 'next';

// Helper function to format city name from slug
function formatCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

type Props = {
  params: { cityName: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityName = formatCityName(params.cityName);

  return {
    title: `One Way Cab from ${cityName} | Outstation Taxi | OneWay.Cab`,
    description: `Book one way cab from ${cityName} to any city. Affordable rates, fixed fare, no extra km charges. 24x7 support. Instant confirmation.`,
    keywords: [
      `${cityName} one way cab`,
      `${cityName} outstation taxi`,
      `cab from ${cityName}`,
      `taxi from ${cityName}`,
      `${cityName} car rental`,
    ],
    openGraph: {
      title: `One Way Cab from ${cityName} | OneWay.Cab`,
      description: `Book one way cab from ${cityName} to any city. Affordable rates, fixed fare, no extra km charges.`,
      url: `https://oneway.cab/city/${params.cityName}`,
      siteName: 'OneWay.Cab',
      type: 'website',
    },
    alternates: {
      canonical: `https://oneway.cab/city/${params.cityName}`,
    },
  };
}

export default function CityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
