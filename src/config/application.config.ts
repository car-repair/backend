import { z } from 'zod';
import { Logger } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { AppConfig } from './types';

const logger = new Logger('Config');

const typeormSchema = z.object({
    type: z.enum(['postgres', 'mysql', 'sqlite'] as const).default('postgres'),
    host: z.string(),
    port: z.string().transform((val) => parseInt(val, 10)).default('5432'),
    database: z.string(),
    username: z.string(),
    password: z.string(),
    schema: z.string().optional().default('public'),
    synchronize: z.string().transform((val) => val === 'true').optional().default('false'),
    logging: z.string().transform((val) => val === 'true').optional().default('false'),
});

const appConfigSchema = z.object({
    APP_PORT: z.string().transform((val) => parseInt(val, 10)).default('3000'),
    DB_TYPE: typeormSchema.shape.type,
    DB_HOST: typeormSchema.shape.host,
    DB_PORT: typeormSchema.shape.port,
    DB_NAME: typeormSchema.shape.database,
    DB_USER: typeormSchema.shape.username,
    DB_PASSWORD: typeormSchema.shape.password,
    DB_SCHEMA: typeormSchema.shape.schema,
    DB_SYNCHRONIZE: typeormSchema.shape.synchronize,
    DB_LOGGING: typeormSchema.shape.logging,
}).transform((data): AppConfig => ({
    port: data.APP_PORT,
    typeorm: {
        type: data.DB_TYPE,
        host: data.DB_HOST,
        port: data.DB_PORT,
        database: data.DB_NAME,
        username: data.DB_USER,
        password: data.DB_PASSWORD,
        schema: data.DB_SCHEMA,
        synchronize: data.DB_SYNCHRONIZE,
        logging: data.DB_LOGGING,
    } as DataSourceOptions
}));
export type ConfigType = z.infer<typeof appConfigSchema>;

export default () => {
    const result = appConfigSchema.safeParse(process.env);

    if (!result.success) {
        logger.error('Invalid environment variables:', result.error.format());
        throw new Error('Environment validation failed');
    }

    return result.data;
};