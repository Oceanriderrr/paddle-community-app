/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Keep this for development benefits
    // Remove experimental.turbopack since it's enabled via --turbopack flag
  };
  
  export default nextConfig;