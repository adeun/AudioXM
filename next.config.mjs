/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'], // Add your image host domains here
  },
  experimental: {
    
    serverActions: {
      bodySizeLimit: '40mb', // maximum `4.5MB/4MB` if you are using Vercel
    },
  },
};

export default nextConfig;
