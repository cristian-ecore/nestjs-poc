import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderModel } from '../orders/order.model';

@Entity({
  name: 'clients'
})
export class ClientModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  birthDate: Date;


  @Column()
  cep: string;

  @OneToMany(() => OrderModel, (order) => order.client)
  orders: OrderModel[]

}