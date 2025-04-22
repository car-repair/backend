import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Length, Max, Min } from 'class-validator';
import { CarColor } from '../entities/car.entity';

export class CreateCarDto {
    @IsUUID()
    @IsNotEmpty()
    brandId: string;

    @IsUUID()
    @IsNotEmpty()
    modelId: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    licensePlate: string;

    @IsEnum(CarColor)
    @IsNotEmpty()
    color: CarColor;

    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear())
    @IsNotEmpty()
    year: number;

    @IsString()
    @IsOptional()
    @Length(0, 17)
    vin?: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    sts: string;
}