import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Car } from 'src/car/entities/car.entity';
const carsRaw = require('./cars/cars.json');

export default class CarSeeder implements Seeder {
    public async run(
        dataSource: DataSource
    ): Promise<void> {
        const carRepository = dataSource.getRepository(Car);

        const existingCars = await carRepository.find();
        if (existingCars.length > 0) {
            return;
        }

        const cars: Partial<Car>[] = [];

        for (const car in carsRaw) {
            cars.push({
                
            })
        }

        await carRepository.save(cars);
        console.log('Car seed added');
    }
}