/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    API_BASE_URL: process.env.API_BASE_URL,
    SERVICE_FEE: process.env.SERVICE_FEE,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  },
};

module.exports = nextConfig;
