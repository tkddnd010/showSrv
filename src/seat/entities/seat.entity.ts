import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Performance } from 'src/performance/entities/performance.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity({
  name: 'seats',
})
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  seatNum: number;

  @Column({ type: 'varchar', nullable: false })
  grade: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'boolean', default: true, nullable: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Performance, (performance) => performance.seats, {
    onDelete: 'CASCADE',
  })
  performance: Performance;

  @Column({ type: 'int', name: 'performance_id' })
  performance_id: number;

  @OneToMany(() => Reservation, (reservation) => reservation.seat)
  reservations: Reservation[];
}
