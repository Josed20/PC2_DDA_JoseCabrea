import { readFileSync } from 'node:fs'

const webhookUrl = process.env.SLACK_WEBHOOK_URL
if (!webhookUrl) {
  console.error('Falta la variable de entorno SLACK_WEBHOOK_URL')
  process.exit(1)
}

const [, , argEstado = '', detalle = ''] = process.argv
const estado = argEstado.toLowerCase()
if (estado !== 'exito' && estado !== 'error') {
  console.error('Uso: node notificar.mjs <exito|error> [detalle]')
  process.exit(1)
}

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const encabezado = estado === 'exito'
  ? ':white_check_mark: ÉXITO: las pruebas pasaron'
  : ':x: ERROR: las pruebas fallaron'
const fecha = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })

const lineas = [
  encabezado,
  `Proyecto: ${pkg.name} v${pkg.version}`,
  `Detalle: ${detalle || 'sin detalle'}`,
  `Fecha: ${fecha}`
]

if (process.env.ALUMNO) {
  lineas.push(`Alumno: ${process.env.ALUMNO}`)
}

const text = lineas.join('\n')

try {
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
  if (!res.ok) {
    console.error(`Error al notificar a Slack: HTTP ${res.status}`)
    process.exit(1)
  }
  console.log(`Notificación enviada: ${estado === 'exito' ? 'ÉXITO' : 'ERROR'}`)
} catch (err) {
  console.error(`Error de conexión con Slack: ${err.message}`)
  process.exit(1)
}
