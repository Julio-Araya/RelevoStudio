import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio 100% estático: todas las rutas se prerenderizan en build.
  // No usar APIs dinámicas (cookies, headers, searchParams) en esta fase.
};

export default nextConfig;
