/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode : false,
    images : {
        remotePatterns : [
            {
                protocol:"https",
                hostname : "files.edgestore.dev"
            }
        ]
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
};

export default nextConfig;
