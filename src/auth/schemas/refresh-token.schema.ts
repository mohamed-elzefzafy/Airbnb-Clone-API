import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({timestamps: true})
export class RefreshToken {
  @Prop()
  userId!: string;

  @Prop()
  refreshToken!: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
