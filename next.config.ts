import type { NextConfig } from 'next';
import path from 'node:path';
const offlineFonts = process.env.KIVA_OFFLINE_FONTS === '1';
const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: offlineFonts
      ? { '@/lib/fonts': './lib/fonts-offline.ts' }
      : {},
  },
  webpack(config, { webpack }) {
    if (offlineFonts) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /^@\/lib\/fonts$/,
          path.resolve(process.cwd(), 'lib/fonts-offline.ts'),
        ),
      );
    }
    return config;
  },
};
export default nextConfig;
