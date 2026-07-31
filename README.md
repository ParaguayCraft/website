# ParaguayCraft Website

Sitio web promocional para el servidor de Minecraft ParaguayCraft — Next.js, TypeScript, Tailwind CSS.

## Desarrollo

```bash
npm ci
npm run dev        # http://localhost:3000
```

## Build de producción

```bash
npm run build
npm start          # http://localhost:3000
```

## Docker

```bash
docker compose up --build -d    # http://localhost:3000
```

La imagen usa `output: "standalone"` de Next.js con Node 22 Alpine, multi-stage.

## Endpoints

| Ruta | Descripción |
|---|---|
| `/` | Homepage con hero, features, status, Discord CTA |
| `/informacion` | Información del servidor y cómo conectarse |
| `/mapa` | BlueMap embebido (ifame a `:8100`) |
| `/reglas` | Normas del servidor (pendiente) |
| `/tienda` | Tienda (pendiente) |
| `/votar` | Votación (pendiente) |
| `/contacto` | Discord y redes sociales |
| `/api/status` | Estado del servidor vía mcsrvstat.us |

## Configuración

Editar `src/config/site.ts` para cambiar IP, Discord, URLs de redes sociales, y URL de BlueMap.
