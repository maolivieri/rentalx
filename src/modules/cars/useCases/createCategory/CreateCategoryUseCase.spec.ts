import "reflect-metadata";
import { AppError } from "@errors/AppError";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    it("Should be able to create a new category", async () => {
        const category: ICreateCategoryDTO = {
            name: "Category Test",
            description: "Category test description",
        };

        await createCategoryUseCase.execute(category);

        const result = await categoriesRepositoryInMemory.findByName(
            category.name
        );

        expect(result).toHaveProperty("id");
    });

    it("should not be able to create a new category when name already exists", async () => {
        expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category test description",
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
