/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ["facecheck.run-asia-northeast1.goorm.site", "localhost"],
  },
};

module.exports = nextConfig;
