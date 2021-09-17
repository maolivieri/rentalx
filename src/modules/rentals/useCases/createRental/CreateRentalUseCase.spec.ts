import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CreateCarUseCase } from "../../../cars/useCases/createCar/CreateCarUseCase";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        dayjsDateProvider = new DayjsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("should be able to register a rental", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Name",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "asda-156",
            fine_amount: 70,
            brand: "Brand",
            category_id: "category",
        });

        const rental = await createRentalUseCase.execute({
            car_id: car.id,
            user_id: "55555",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to register a rental for a car already in use", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "12345",
                user_id: "11111",
                expected_return_date: dayAdd24Hours,
            });
            const rental = await createRentalUseCase.execute({
                car_id: "12345",
                user_id: "55555",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to register a rental for a user already in use", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "12345",
                user_id: "22222",
                expected_return_date: dayAdd24Hours,
            });
            const rental = await createRentalUseCase.execute({
                car_id: "54321",
                user_id: "22222",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to register a rental with a invalid return time", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "12345",
                user_id: "22222",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
