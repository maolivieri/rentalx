import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import {DayjsDateProvider} from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        dayjsDateProvider: = new DayjsDateProvider
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory, dayjsDateProvider
        );
    });

    it("should be able to register a rental", async () => {
        const rental = await createRentalUseCase.execute({
            car_id: "12345",
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
