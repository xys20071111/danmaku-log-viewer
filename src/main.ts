import { app } from './app.ts'
import { config } from './config.ts'

await app.listen({
    hostname: '0.0.0.0',
    port: config.port
})
