/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Habilita el modo estricto de React.
  eslint: {
    ignoreDuringBuilds: true, // Ignora errores de ESLint durante la construcción.
  },
  typescript: {
    ignoreBuildErrors: true, // Ignora errores de TypeScript durante la construcción.
  },
  images: {
    unoptimized: true, // Desactiva la optimización de imágenes de Next.js.
  },
};

export default nextConfig;