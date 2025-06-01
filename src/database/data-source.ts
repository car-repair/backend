import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import appConfig from '../config/application.config';
import { SeederOptions } from 'typeorm-extension';

dotenv.config(); // подгрузим .env

const config = appConfig(); // используем тот же конфиг, что и в Nest

const appDataSourceOptions: DataSourceOptions & SeederOptions = {
    ...config.typeorm,
    seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
};

export const AppDataSource = new DataSource(appDataSourceOptions);