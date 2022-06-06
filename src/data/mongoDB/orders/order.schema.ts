import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Client } from "../../../clients/entities/client.entity"

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Client'})
  client: Client;

  @Prop()
  createdAt: Date;

  @Prop()
  itens: string[];

}

export const OrderSchema = SchemaFactory.createForClass(Order).set('toJSON', {
  virtuals: true
});