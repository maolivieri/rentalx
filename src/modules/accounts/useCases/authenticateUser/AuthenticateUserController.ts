import { container } from "tsyringe";
import { Request, Response } from "express";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUserUserCase = container.resolve(
            AuthenticateUserUseCase
        );

        const token = await authenticateUserUserCase.execute({
            password,
            email,
        });

        return response.json(token);
    }
}

export { AuthenticateUserController };
