import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/Models/crearUserDto';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {

    constructor(private  userService: UsersService ,  private readonly jwtService: JwtService,) {}

    /*
    @Get()
    getAllProductos(){
        return this.userService.findAll();
    }
        */

    @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: CreateUserDto): Promise<any> {
    const user = await this.userService.validateUser(loginDto.email, loginDto.contrasena);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return { message: 'Login successful', user };
  }
}
