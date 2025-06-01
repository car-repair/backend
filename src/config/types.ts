import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export interface AppConfig {
    port: number;
    typeorm: DataSourceOptions & SeederOptions;
    telegram: {
        botToken?: string;
        chatId?: string;
    };
}