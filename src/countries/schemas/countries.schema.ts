import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Country {
  @Prop()
  name!: string;

  @Prop({ default: '' })
  countryCode!: string;

  @Prop({ default: false })
  isDeleted!: boolean;

@Prop({ type: Date, default: null })
deletedAt!: Date | null;
}

export const CountrySchema = SchemaFactory.createForClass(Country);