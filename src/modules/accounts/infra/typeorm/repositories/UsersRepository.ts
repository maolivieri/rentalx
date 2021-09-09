import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/Users";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }

    async create({
        id,
        name,
        email,
        driver_license,
        password,
        avatar,
    }: ICreateUserDTO) {
        const user = this.repository.create({
            id,
            name,
            email,
            driver_license,
            password,
            avatar,
        });

        await this.repository.save(user);
    }
}

export { UsersRepository };
