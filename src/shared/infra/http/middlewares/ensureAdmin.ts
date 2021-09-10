import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;

    const usersRespository = new UsersRepository();
    const user = await usersRespository.findById(id);

    if (!user.isAdmin) {
        throw new AppError("Not Allowed");
    }

    return next();
}
