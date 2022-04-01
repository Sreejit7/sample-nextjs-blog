/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.graphassets.com"],
  },
  env: {
    HOST_NAME: process.env.HOST_NAME,
    NEXT_PUBLIC_GRAPHCMS_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
    GRAPHCMS_AUTH_TOKEN: process.env.GRAPHCMS_AUTH_TOKEN,
  },
};

module.exports = nextConfig;
