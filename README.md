# tienda-api (PC02 - Despliegue de Aplicaciones)

API de ejemplo sin dependencias. Requiere Node.js 20 o superior.

    npm test            # ejecuta las pruebas
    npm run test:cov    # pruebas con cobertura
    npm start           # inicia el servidor en el puerto 3000
    node verificar.mjs  # autoverificación de la parte práctica
    npm run pipeline    # pruebas y notificación a Slack (requiere SLACK_WEBHOOK_URL)

Rutas actuales: `/productos` y `/total?ids=1,2&cupon=DESC10`.
Las instrucciones de la práctica están en el enunciado de la PC02.

## Despliegue

- **Plataforma:** Render (Web Service, Node 22, `npm ci` + `npm start`)
- **URL pública:** https://pc2-dda-josecabrea.onrender.com
- **Health check:** https://pc2-dda-josecabrea.onrender.com/health → `{"status":"ok"}`

El plan gratuito de Render suspende el servicio tras un periodo de inactividad; la primera petición puede tardar unos segundos mientras se reactiva.
