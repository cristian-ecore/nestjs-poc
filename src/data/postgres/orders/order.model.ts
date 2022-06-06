import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import {ClientModel} from '../clients/client.model';


@Entity({
  name: 'orders'
})
export class OrderModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: "uuid", nullable: true })
  clientId: string;

  @ManyToOne(() => ClientModel, client => client.orders)
  @JoinColumn({name: 'clientId'})
  client: ClientModel;

  @Column()
  createdAt: Date;

  @Column({
    type: 'jsonb'
  })
  itens: string[];

}