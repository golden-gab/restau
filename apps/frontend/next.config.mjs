/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: process.env.IMAGE_PROTOCOL,
                hostname: process.env.IMAGE_HOSTNAME,
                pathname: process.env.IMAGE_PATHNAME,
            },
        ],
    },
};

export default nextConfig;
