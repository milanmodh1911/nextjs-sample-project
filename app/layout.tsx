import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_CONFIG, ANALYTICS } from '@/lib/constants';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'One Way Cab | Taxi One Way | One Way Car Rentals India | OneWay.Cab',
    template: '%s | OneWay.Cab',
  },
  description: SITE_CONFIG.description,
  keywords: [
    'One Way Cab',
    'One Way Taxi Service',
    'One Way Car Rental',
    'Car Rental One Way',
    'One Side Car Hire in India',
    'Taxi One Way',
    'Book One Way Car on Rent',
    'India One Way Taxi Service',
    'One Way Taxi Hire in India',
    'Taxi Booking One Way',
  ],
  authors: [{ name: 'OneWay.Cab' }],
  creator: 'Baroda Taxi Cabs Pvt Ltd',
  publisher: 'OneWay.Cab',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'One Way Cab | India\'s Leading One Way Inter-City Cab Provider',
    description: SITE_CONFIG.description,
    images: [
      {
        url: `${SITE_CONFIG.url}/img/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'OneWay.Cab - Book One Way Taxi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@OneWayCab',
    creator: '@OneWayCab',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${ANALYTICS.googleTagManager}');
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.googleAnalytics}`}
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ANALYTICS.googleAnalytics}');
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${ANALYTICS.facebookPixel}');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${ANALYTICS.googleTagManager}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Facebook Pixel (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${ANALYTICS.facebookPixel}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
