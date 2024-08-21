import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "./UserEntity";
import { AuditEntity } from "./AuditEntity";

@Entity({ name: "cars" })
export class CarEntity extends AuditEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "regNo" })
  regNo!: string;

  @Column({ name: "brand" })
  brand!: string;

  @Column({ name: "model" })
  model!: string;

  @Column({ name: "year" })
  year!: string;

  @Column({ name: "seatCapacity" })
  seatCapacity!: number;

  @ManyToOne(() => UserEntity, (user) => user.cars, { eager: true })
  user!: UserEntity;
}
