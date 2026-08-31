import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CountryResponseDto {
  _id!:string;
  
  name!: string;

  countryCode!: string;
}
