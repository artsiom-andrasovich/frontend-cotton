import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ❌ Не прерывать сборку из-за ошибок линтинга
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
