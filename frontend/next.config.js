/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  // Configuration pour l'optimisation
  compress: true,
  poweredByHeader: false,
  // Configuration pour les variables d'environnement
  env: {
    CUSTOM_KEY: 'PNL_FORMATION_APP_2025',
  },
  // Webpack configuration pour optimiser le build
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = nextConfig;
