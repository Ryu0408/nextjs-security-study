/** @type {import('next').NextConfig} */

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const nextConfig = {
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
    ]
  },
}

export default nextConfig
