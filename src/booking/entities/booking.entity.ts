import { Car } from "../../car/entities/car.entity";
import { Service } from "../../service/entities/service.entity";
import {
	Entity,
	ManyToMany,
	JoinTable,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
} from "typeorm";

@Entity({
	name: "bookings",
})
export class Booking {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToMany(() => Service)
	@JoinTable({
		name: "booking_services",
		joinColumn: {
			name: "booking_id",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "service_id",
			referencedColumnName: "id",
		},
	})
	services: Service[];

	@Column({
		length: 15,
		type: 'varchar'
	})
	phone: string

	@Column({
		type: 'varchar',
		length: '30'
	})
	firstname: string

	@Column({
		type: 'varchar',
		length: '30'
	})
	lastname: string

	@Column({ type: 'timestamp with time zone' })
  	startsAt: Date;

	@Column({ type: 'timestamp with time zone' })
	endsAt: Date;

	@Column({ 
		type: 'text',
		nullable: true
	})
	comment?: string;

	@ManyToOne(() => Car, (car) => car.bookings)
	car: Car;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;

	@DeleteDateColumn({ name: "deleted_at" })
	deletedAt?: Date;

	constructor(data: Partial<Booking> = {}) {
		Object.assign(this, data);
	}
}
