/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/hello',
        destination: 'http://localhost:8084/hello',
      },
      {
        source: '/public',
        destination: 'http://localhost:8084/public',
      },
      {
        source: '/login',
        destination: 'http://localhost:8084/login',
      },
      {
        source: '/logout',
        destination: 'http://localhost:8084/logout',
      },
    ]
  },
}

export default nextConfig
