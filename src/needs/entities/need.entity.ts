import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shelter } from '../../shelters/entities/shelter.entity';
import { NeedStatus } from '../enums/need-status.enum';

@Entity('needs')
export class Need {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  purchaseLink?: string;

  @Column({ type: 'int', nullable: true })
  quantity?: number;

  @Column({
    type: 'enum',
    enum: NeedStatus,
    default: NeedStatus.MODERATE,
  })
  status: NeedStatus;

  @ManyToOne(() => Shelter, (shelter) => shelter.needs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shelterId' })
  shelter: Shelter;

  @Column()
  shelterId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
