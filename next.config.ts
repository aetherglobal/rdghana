import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [{ source: "/company/careers/:path*", destination: "/careers", permanent: true }];
  },
};

export default withPayload(nextConfig);
