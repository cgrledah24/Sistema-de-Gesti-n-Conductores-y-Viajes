# Driver Management - Netlify Ready

Proyecto minimal listo para desplegar en Netlify (cliente SPA con Vite + React).

Características incluidas:
- Interfaz en español.
- Login simple: administrador y conductores.
- Dashboard: calendario simple, programación de viajes, aceptación de viajes.
- Control de disponibilidad de conductores.
- Ajuste manual de costos y conversión USD -> CRC usando tasa configurable.
- Placeholders para integración de Email/SMS (serverless functions recomendadas).
- Roles: `admin` (ver/editar todo) y `driver` (solo su información).

Despliegue:
1. `npm install`
2. `npm run build`
3. Subir carpeta `dist` a Netlify o conectar repo; Netlify detectará `npm run build` y publicará `dist`.
