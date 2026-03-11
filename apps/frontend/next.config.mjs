/** @type {import('next').NextConfig} */
const nextConfig = {
     async headers() {
        return [
            {
                source: "/_next/static/:path*",
                headers: [
                    { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
                ],
            },
        ];
    },
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
