/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.receiteria.com.br'
        },
        {
          protocol: 'https',
          hostname: 'uploaddeimagens.com.br'
        },
        {
          protocol: 'https',
          hostname: 'receitason.com'
        }
      ]
    }
  };
  
  export default nextConfig;
  