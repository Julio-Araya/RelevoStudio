import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio 100% estático: todas las rutas se prerenderizan en build.
  // No usar APIs dinámicas (cookies, headers, searchParams) en esta fase.
  experimental: {
    // CSS inline en el HTML: evita el request bloqueante de la hoja de estilos
    inlineCss: true,
  },
};

export default nextConfig;
