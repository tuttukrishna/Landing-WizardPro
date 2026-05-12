/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Allow inline scripts (needed for legacy inline event handlers during migration)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
