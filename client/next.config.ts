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
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
        pathname: '/uploads/**',
      },
    ],
    // Use unoptimized images in development to bypass localhost restrictions
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
