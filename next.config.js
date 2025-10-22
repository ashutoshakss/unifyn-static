/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: '.next',
  images: { unoptimized: true },
  trailingSlash: true,
  
  // Performance optimizations
  compress: true,
  
  // Production optimizations
  productionBrowserSourceMaps: false,
  
  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Optimize React
  reactStrictMode: true,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  
  // Disable legacy polyfills - target modern browsers only
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
