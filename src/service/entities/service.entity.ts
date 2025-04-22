import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity({
	name: "services",
})
export class Service {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ nullable: true })
	description?: string;

	@Column({
		nullable: true,
		name: "icon_url",
	})
	iconUrl?: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;

	@DeleteDateColumn({ name: "deleted_at" })
	deletedAt?: Date;

	constructor(data: Partial<Service> = {}) {
		Object.assign(this, data);
	}
}
