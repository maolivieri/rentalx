import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsReponsitory: IRentalsRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({
        car_id,
        expected_return_date,
        user_id,
    }: IRequest): Promise<Rental> {
        const minimumHour = 24;
        const carUnavailable =
            await this.rentalsReponsitory.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError("Car is not available");
        }

        const rentalOpenToUser = await this.rentalsReponsitory.findOpenRental(
            user_id
        );

        if (rentalOpenToUser) {
            throw new AppError("There is a rental in progress for user");
        }

        const dateNow = this.dateProvider.dateNow();
        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        );

        if (compare < minimumHour) {
            throw new AppError("Invalid return time");
        }

        const rental = await this.rentalsReponsitory.create({
            car_id,
            expected_return_date,
            user_id,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
