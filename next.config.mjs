/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.module.rules.push({
            test: /\.(mp3|wav|mpe?g|ogg)$/,
            type: 'asset/resource',
          });
        }
    
        return config;
      },
};

export default nextConfig;
