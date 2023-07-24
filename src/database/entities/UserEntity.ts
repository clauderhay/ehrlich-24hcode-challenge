import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Image } from './ImageEntity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 20, default: 'user' })
  role: string;

  @OneToMany(() => Image, image => image.user, { cascade: true })
  images: Image[];
}