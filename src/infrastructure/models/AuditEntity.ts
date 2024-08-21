import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

export class AuditEntity {
  @Column({ name: "createdBy", nullable: true, default: "system" })
  createdBy?: string;

  @Column({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date;

  @Column({ name: "updatedBy", nullable: true, default: "system" })
  updatedBy?: string;

  @Column({
    name: "updatedAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt?: Date;
}
