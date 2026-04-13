import { Column } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class Address {
  @Column()
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  street: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  houseNumber: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  apartmentNumber?: string;
}
