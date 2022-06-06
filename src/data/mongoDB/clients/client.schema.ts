import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Client extends Document{
  @Prop()
  name: string;

  @Prop()
  birthDate: Date;

  @Prop()
  email: string;

  @Prop()
  cep: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client).set('toJSON', {
  virtuals: true
});