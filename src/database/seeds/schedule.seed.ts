import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { DaysOfWeek } from '../../utils/types';

export default class ScheduleSeeder implements Seeder {
    public async run(
        dataSource: DataSource
    ): Promise<void> {
        const scheduleRepository = dataSource.getRepository(Schedule);

        const existingSchedules = await scheduleRepository.find();
        if (existingSchedules.length > 0) {
            return;
        }

        const schedules: Partial<Schedule>[] = [
            { dayOfWeek: DaysOfWeek.Monday, startTime: '09:00', endTime: '18:00', isDayOff: false },
            { dayOfWeek: DaysOfWeek.Tuesday, startTime: '09:00', endTime: '18:00', isDayOff: false },
            { dayOfWeek: DaysOfWeek.Wednesday, startTime: '09:00', endTime: '18:00', isDayOff: false },
            { dayOfWeek: DaysOfWeek.Thursday, startTime: '09:00', endTime: '18:00', isDayOff: false },
            { dayOfWeek: DaysOfWeek.Friday, startTime: '09:00', endTime: '18:00', isDayOff: false },
            { dayOfWeek: DaysOfWeek.Saturday, isDayOff: true },
            { dayOfWeek: DaysOfWeek.Sunday, isDayOff: true },
        ];

        await scheduleRepository.save(schedules);
        console.log('Schedule seed added');
    }
}