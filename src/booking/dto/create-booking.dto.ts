import { IsArray, IsISO8601, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateBookingDto {
    @IsString()
    phone: string

    @IsString()
    firstname: string

    @IsString()
    lastname: string

    @IsISO8601()
    startsAt: string;

    @IsString()
    @IsOptional()
    comment?: string;

    @IsArray()
    @IsUUID(4, { each: true })
    servicesIds: string[]

    @IsUUID(4)
    carId: string
}
