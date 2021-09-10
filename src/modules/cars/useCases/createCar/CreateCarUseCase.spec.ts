import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });
    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Name",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "asda-156",
            fine_amount: 70,
            brand: "Brand",
            category_id: "category",
        });
        expect(car).toHaveProperty("id");
    });
    it("should not be able to create a car with existing license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Car Name",
                description: "Car Description",
                daily_rate: 100,
                license_plate: "asda-156",
                fine_amount: 70,
                brand: "Brand",
                category_id: "category",
            });

            await createCarUseCase.execute({
                name: "Car Name Two",
                description: "Car Description two",
                daily_rate: 110,
                license_plate: "asda-156",
                fine_amount: 50,
                brand: "Brand Two",
                category_id: "category",
            });
        });
    });
    it("should be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Name",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "asda-156",
            fine_amount: 70,
            brand: "Brand",
            category_id: "category",
        });

        expect(car.available).toBe(true);
    });
});
