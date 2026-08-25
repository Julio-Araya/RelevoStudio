import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Las páginas de contenido se prerenderizan en build: el copy tiene que
  // llegar en el HTML sin JavaScript. Solo /api/chat y /api/lead son dinámicas.
  experimental: {
    // CSS inline en el HTML: evita el request bloqueante de la hoja de estilos
    inlineCss: true,
  },
};

export default nextConfig;
