import { Booking } from 'src/booking/entities/booking.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Brand } from '../brand/entities/brand.entity';
import { Model } from '../model/entities/model.entity';

export enum CarColor {
    BLACK = 'Чёрный',
    WHITE = 'Белый',
    RED = 'Красный',
    BLUE = 'Синий',
    GREEN = 'Зелёный',
    SILVER = 'Серебристый',
    GRAY = 'Серый',
    YELLOW = 'Жёлтый',
    OTHER = 'Другой',
  }

@Entity({
    name: 'cars',
})
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Brand, (brand) => brand.cars)
    brand: Brand; // Связь с сущностью Brand

    @ManyToOne(() => Model, (model) => model.cars)
    model: Model;

    @Column({ type: 'varchar', length: 20, unique: true })
    licensePlate: string; // А123БВ 77

    @Column({ type: 'enum', enum: CarColor, default: CarColor.BLACK })
    color: CarColor; // Цвет через enum

    @Column({ type: 'int' })
    year: number; // Год выпуска

    @Column({ type: 'varchar', length: 17, nullable: true })
    vin: string; // VIN (необязательный)

    @Column({ type: 'varchar', length: 20 })
    sts: string;

    @OneToMany(() => Booking, (booking) => booking.car)
    bookings: Booking[];

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at" })
    deletedAt?: Date;

    constructor(data: Partial<Car> = {}) {
        Object.assign(this, data);
    }
}