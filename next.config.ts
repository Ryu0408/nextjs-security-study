import type { NextConfig } from "next";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/hello',
        destination: `${backendUrl}/hello`,
      },
      {
        source: '/public',
        destination: `${backendUrl}/public`,
      },
      {
        source: '/login',
        destination: `${backendUrl}/login`,
      },
      {
        source: '/logout',
        destination: `${backendUrl}/logout`,
      },
      {
        source: '/api/csrf-token',
        destination: `${backendUrl}/api/csrf-token`
      },
      {
        source: '/admin/:path*',
        destination: `${backendUrl}/admin/:path*`,
      },
      {
        // 회원가입 등 API 공통 프록시
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
