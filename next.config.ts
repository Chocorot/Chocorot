import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', '192.168.0.6'],
  async redirects() {
    return [
      {
        source: '/object',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
