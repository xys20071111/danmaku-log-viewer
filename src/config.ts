import { UTF8Decorder } from './enconding.ts'

export interface IConfig {
    dbusername: string
    dbpassword: string
    dbhost: string
    dbport?: number
    db: string
    port: number
}

export const config: IConfig = JSON.parse(UTF8Decorder.decode(Deno.readFileSync(Deno.args[0])))