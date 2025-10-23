/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@icon-builder/shared-types', '@icon-builder/compiler'],
};

module.exports = nextConfig;
