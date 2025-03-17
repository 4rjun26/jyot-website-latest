/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['jyot.in',"i.ytimg.com"], // Add the allowed hostname here
  },
  async headers() {
    return [
      {
        source:  '/(.*)',
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};

export default nextConfig;
