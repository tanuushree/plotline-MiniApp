/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence warnings
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },

  // Add frame-safe headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL", // Or remove this header entirely
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *", // Allow all domains to embed
          },
        ],
      },
    ];
  },
};

export default nextConfig;
