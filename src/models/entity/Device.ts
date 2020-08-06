import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("device")
export default class Device {

  @PrimaryColumn()
  public serial!: string;

  @Column()
  public name!: string;

}