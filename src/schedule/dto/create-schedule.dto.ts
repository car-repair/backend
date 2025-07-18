import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { DaysOfWeek } from '../../common/utils/types';

export class CreateScheduleDto {
    @IsEnum(DaysOfWeek)
    @IsNotEmpty()
    dayOfWeek: string;

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

    @IsOptional()
    isDayOff?: boolean;
}