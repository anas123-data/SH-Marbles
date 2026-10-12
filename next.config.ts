import type { NextConfig } from 'next';

const config: NextConfig = {
  poweredByHeader: false,
  images: { formats: ['image/webp'], qualities: [75, 85] },
};
export default config;
