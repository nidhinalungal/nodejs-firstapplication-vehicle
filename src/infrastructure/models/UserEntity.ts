import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CarEntity } from "./CarEntity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid", { name: "uuid" })
  id!: string;

  @Column({ name: "name" })
  name!: string;

  @Column({ name: "username" })
  username!: string;

  @Column({ name: "password" })
  password!: string;

  @Column({ name: "role" })
  role!: string;

  @Column({ name: "dob" })
  dob!: string;

  @OneToMany(() => CarEntity, (car) => car.user)
  cars!: CarEntity[];
}
