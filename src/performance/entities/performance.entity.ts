import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../types/category.type';
import { Seat } from 'src/seat/entities/seat.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity({
  name: 'performances',
})
export class Performance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column('json', { nullable: false })
  schedule: any[];

  @Column({ type: 'varchar', nullable: false })
  place: string;

  @Column({ type: 'varchar', nullable: false })
  pfmInfo: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'enum', enum: Category, nullable: false })
  category: Category;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Seat, (seat) => seat.performance)
  seats: Seat[];

  @OneToMany(() => Reservation, (reservation) => reservation.performance)
  reservations: Reservation[];
}
