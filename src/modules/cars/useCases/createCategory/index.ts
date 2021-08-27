import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesRepository = new CategoriesRepository();
const createcreateCategoryUseCase = new CreateCategoryUseCase(
    categoriesRepository
);

const createCategoryController = new CreateCategoryController(
    createcreateCategoryUseCase
);

export { createCategoryController };
