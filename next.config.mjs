import createNextIntlPlugin from "next-intl/plugin";
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    async redirects() {
        return [
            {
            source: "/en-US/:path*",
            destination: "/en/:path*",
            permanent: true,
            },
            {
            source: "/zh-CN/:path*",
            destination: "/zh/:path*",
            permanent: true,
            },
            {
            source: "/zh-HK/:path*",
            destination: "/zh/:path*",
            permanent: true,
            },
            {
            source: "/zh-TW/:path*",
            destination: "/zh/:path*",
            permanent: true,
            },
        ];
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};

if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform()
}

export default withNextIntl(nextConfig);
