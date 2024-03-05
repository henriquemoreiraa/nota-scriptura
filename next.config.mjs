/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    windowHistorySupport: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
      },
    ],
  },

};

export default nextConfig;
