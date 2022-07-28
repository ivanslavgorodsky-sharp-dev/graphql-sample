import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const config = dotenv.parse(fs.readFileSync('.env'));
// console.log(config);

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: config.DB_HOST as string,
        port: Number.parseInt(process.env.DB_PORT),
        username: config.DB_USER as string,
        password: config.DB_PASSWORD as string,
        database: config.DB_DATABASE as string,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        migrationsRun: false,
        autoLoadEntities: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
