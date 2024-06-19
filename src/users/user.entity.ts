import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('usuarios')
export class usuarios {
 
@PrimaryColumn({ nullable: false }) 
email: string;

@Column()
contrasena: string;
}