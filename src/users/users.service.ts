import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/Models/crearUserDto';
import { usuarios } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//jwt
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(usuarios)
        private usersRepository: Repository<usuarios>, private readonly jwtService: JwtService,
      ) {}
    
       addUser(createUserDto: CreateUserDto): Promise<usuarios> {
        const newUser = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(newUser);
      }

      async validateUser(email: string, contrasena: string): Promise<any | null> {
        const user = await this.findUserByCorreo(email);
        if (user && user.contrasena === contrasena) {
          const token = this.generateJwtToken(user);
          return {
            "email" : user.email,
            "contrasena" : user.contrasena,
            "token" : token
          };
        }
        return null;
      }

      async findUserByCorreo(email: string): Promise<usuarios | undefined> {
        return this.usersRepository.findOne({ where: { email  } });
      }

      private generateJwtToken(user: usuarios): string {
        const payload = { email: user.email, sub: user.contrasena };
        return this.jwtService.sign(payload);
      }

}
