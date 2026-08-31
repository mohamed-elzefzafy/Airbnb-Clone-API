import { IsMongoId, IsNotEmpty } from "class-validator";

export class FindCountryByIdDto{
  @IsNotEmpty()
  @IsMongoId({message:"param must be object id"})
  id!:string;
}