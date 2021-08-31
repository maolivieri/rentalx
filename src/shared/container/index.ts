import { container } from "tsyringe"
import {ISpecificationsRepository} from "../../modules/cars/repositories/ISpecificationsRepository";
import {ICategoriesRepository} from "../../modules/cars/repositories/ICategoriesRepository";
import {SpecificationsRepository} from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import {CategoriesRepository} from "../../modules/cars/repositories/implementations/CategoriesRepository";



//ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)


container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
)