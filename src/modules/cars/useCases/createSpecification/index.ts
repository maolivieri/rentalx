import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

import { CreateSpecificationController } from "./CreateSpecificationController";

const specificationsRepository = SpecificationsRepository.getInstance();
const createcreateSpecificationUseCase = new CreateSpecificationUseCase(
    specificationsRepository
);

const createSpecificationController = new CreateSpecificationController(
    createcreateSpecificationUseCase
);

export { createSpecificationController };
