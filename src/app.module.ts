import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

//jwt
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'Backend',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // No usar en producción
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
