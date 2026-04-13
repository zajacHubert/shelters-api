import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  houseNumber: string;

  @IsOptional()
  @IsString()
  apartmentNumber?: string;
}

export class CreateShelterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsBoolean()
  deliverySameAsAddress: boolean;

  @ValidateIf((o) => o.deliverySameAsAddress === false)
  @ValidateNested()
  @Type(() => AddressDto)
  deliveryAddress?: AddressDto;
}
