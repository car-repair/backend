import { Car } from '../../entities/car.entity'; // Обновляем путь
import { Model } from '../../model/entities/model.entity'; // Обновляем путь
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'brands',
})
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @OneToMany(() => Car, (car) => car.brand)
  cars: Car[];

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;

  constructor(data: Partial<Brand> = {}) {
    Object.assign(this, data);
  }
}