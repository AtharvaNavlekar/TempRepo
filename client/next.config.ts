import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

const withAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

export default withAnalyzer(nextConfig);
