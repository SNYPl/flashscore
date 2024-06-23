/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.flashscore.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
