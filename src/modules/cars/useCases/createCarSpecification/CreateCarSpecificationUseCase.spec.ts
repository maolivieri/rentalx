import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepostoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create car specification", () => {
    beforeEach(() => {
        carsRepostoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepostoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("should not be able to add a new specification to a non existing the car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];

            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepostoryInMemory.create({
            name: "Car Name",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "asda-156",
            fine_amount: 70,
            brand: "Brand",
            category_id: "category",
        });

        const specification = await specificationsRepositoryInMemory.create({
            name: "spec name",
            description: "spec description",
        });

        const car_id = car.id;
        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id,
            specifications_id,
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
});
