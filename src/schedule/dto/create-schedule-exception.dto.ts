import { IsDateString, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateScheduleExceptionDto {
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsOptional()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/, {
        message: 'startTime must be in HH:mm or HH:mm:ss format (e.g., 09:00 or 09:00:00)',
    })
    startTime?: string;

    @IsString()
    @IsOptional()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/, {
        message: 'endTime must be in HH:mm or HH:mm:ss format (e.g., 18:00 or 18:00:00)',
    })
    endTime?: string;

    @IsString()
    @IsOptional()
    reason?: string;
}