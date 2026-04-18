import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.embedded';

@Entity('shelters')
export class Shelter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  phoneNumber: string;

  @Column(() => Address, { prefix: 'address' })
  address: Address;

  @Column({ default: true })
  deliverySameAsAddress: boolean;

  @Column(() => Address, { prefix: 'delivery' })
  deliveryAddress: Address;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany('Need', (need: any) => need.shelter)
  needs: any[];
}
