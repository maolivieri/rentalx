import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });
    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Name",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "asda-156",
            fine_amount: 70,
            brand: "Brand",
            category_id: "category",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });
    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Name",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "asda-156",
            fine_amount: 70,
            brand: "car_brand_test",
            category_id: "category",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "car_brand_test",
        });

        expect(cars).toEqual([car]);
    });
    it("should be able to list all available cars by category_id", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Name",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "asda-156",
            fine_amount: 70,
            brand: "car_brand_test",
            category_id: "category_test",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "category_test",
        });

        expect(cars).toEqual([car]);
    });
    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Name Test",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "asda-156",
            fine_amount: 70,
            brand: "car_brand_test",
            category_id: "category",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car Name Test",
        });

        expect(cars).toEqual([car]);
    });
});
