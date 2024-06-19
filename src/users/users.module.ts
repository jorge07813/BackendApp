import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usuarios } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

//jwt
import { JwtModule } from '@nestjs/jwt';

@Module({
  
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([usuarios])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
