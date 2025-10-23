/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
      },
      {
        hostname: "m.media-amazon.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
