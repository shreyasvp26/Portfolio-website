import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/112315129_Shreyas_Patil.pdf",
        destination: "/112315129_ShreyasPatil.pdf",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "all",
          },
        ],
      },
      {
        source: "/llms-full.txt",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "all",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
