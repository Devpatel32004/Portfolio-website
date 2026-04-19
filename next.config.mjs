/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Production-safe configuration
  output: 'standalone',
  poweredByHeader: false,
};

export default nextConfig;
