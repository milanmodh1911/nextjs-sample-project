/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['oneway.cab', 'api.oneway.cab', 's3-eu-west-1.amazonaws.com'],
  },
  async redirects() {
    return [
      // Redirect old .html URLs to clean URLs
      {
        source: '/:path*.html',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
