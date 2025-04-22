import { DataSourceOptions } from "typeorm"

export type AppConfig = {
    port: number
    typeorm: DataSourceOptions
}