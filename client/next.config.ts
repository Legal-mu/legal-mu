import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin requests in development
  // Useful for testing on mobile devices or other machines on the same network
  allowedDevOrigins: [
    '192.168.0.101', // Your current IP
    // Add more IPs as needed, or use a pattern
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
