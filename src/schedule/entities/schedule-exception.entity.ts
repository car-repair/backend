import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'schedule_exceptions' })
export class ScheduleException {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Дата исключения (например, '2025-04-21')
    @Column({ type: 'date' })
    date: string;

    // Время начала работы (например, '10:00'), если null — день нерабочий
    @Column({ type: 'time', nullable: true })
    startTime: string;

    // Время окончания работы (например, '16:00'), если null — день нерабочий
    @Column({ type: 'time', nullable: true })
    endTime: string;

    // Причина исключения (опционально, например, "Праздник")
    @Column({ type: 'varchar', length: 255, nullable: true })
    reason: string;

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