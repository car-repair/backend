import { DaysOfWeek } from '../../common/utils/types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'schedule' })
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: DaysOfWeek,
    unique: true, // Уникальность для дня недели
  })
  dayOfWeek: string;

  // Время начала работы (например, '09:00')
  @Column({ type: 'time', nullable: true })
  startTime: string;

  // Время окончания работы (например, '18:00')
  @Column({ type: 'time', nullable: true })
  endTime: string;

  // Является ли день выходным
  @Column({ type: 'boolean', default: false })
  isDayOff: boolean;

  // Время создания записи
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Время обновления записи
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}