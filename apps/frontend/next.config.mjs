/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
   images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'admin.test',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;

