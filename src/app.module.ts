import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Template } from './template/template.entity';
import { TemplateModule } from './template/template.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Template],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Template]),
    UsersModule,
    TemplateModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: AuthInterceptor },
  ],
})
export class AppModule {}
