import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/Users";
import { IUsersRepository } from "../IUsersRepository";

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
