import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "owners" })
export class OwnerEntity {
  @PrimaryGeneratedColumn({ name: "uuid" })
  id!: string;

  @Column({ name: "name" })
  name!: string;

  @Column({ name: "age" })
  age!: string;

  @Column({ name: "address" })
  address!: string;
}
