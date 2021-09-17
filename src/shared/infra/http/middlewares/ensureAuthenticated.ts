import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
// import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    const usersTokensRepository = new UsersTokensRepository();
    // const usersRepository = new UsersRepository();

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }
    s;

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        const user = await usersTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );

        if (!user) {
            throw new AppError("User not found", 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch (error) {
        throw new AppError("Invalid token", 401);
    }
}
