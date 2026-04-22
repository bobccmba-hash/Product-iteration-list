import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        "**/node_modules/**",
        "**/tmp-webmd/**",
        "**/tmp-webmd-src/**",
        "**/.tmp-awesome-design-md/**",
        "**/dist-desktop/**",
        "**/.next/**",
        "**/.cursor/**",
        "**/electron/**",
      ],
    };
    return config;
  },
};

export default nextConfig;
