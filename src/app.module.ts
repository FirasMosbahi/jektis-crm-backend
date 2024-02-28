import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { HotelModule } from './hotel/hotel.module';
import { VisaModule } from './visa/visa.module';
import { ClientRequestModule } from './client-request/client-request.module';
import { VoyageRequestModule } from './voyage-request/voyage-request.module';
import { BilletModule } from './billet/billet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        BCRYPT_ROUNDS: Joi.number().required(),
        // STORAGE_CONNECTION_STRING: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION_TIME'),
        },
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_HOST'),
      }),
    }),
    CommonModule,
    AuthModule,
    HotelModule,
    VisaModule,
    ClientRequestModule,
    VoyageRequestModule,
    BilletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
