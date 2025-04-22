import { IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
	@IsString()
	name: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsString()
	@IsOptional()
	iconUrl?: string;
}
