import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { CreateSpecificationController } from "./CreateSpecificationController";

const specificationsRepository = new SpecificationsRepository();
const createcreateSpecificationUseCase = new CreateSpecificationUseCase(
    specificationsRepository
);

const createSpecificationController = new CreateSpecificationController(
    createcreateSpecificationUseCase
);

export { createSpecificationController };
