import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export default class User {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column({ nullable: true })
  public birthdate!: string;

}