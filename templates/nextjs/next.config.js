const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@manta/ui'],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
      '@manta/ui': path.resolve(__dirname, '../..', 'packages/ui/src'),
      '@/components/layouts': path.resolve(__dirname, 'src', 'components', 'layouts'),
    };
    return config;
  }
};
// Removed '@/lib/utils' alias; use '@manta/ui' for utilities
module.exports = nextConfig;
