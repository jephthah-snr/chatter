import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "@shared/utils/error.utils";
import { NOT_FOUND, UNAUTHORIZED, BAD_REQUEST } from "http-status";
import { container } from "tsyringe";
import { UserRepository } from "@v1/repositories/user.repository";
import { ErrorResponse } from "@shared/utils/response.util";
import logger from "@shared/utils/logger";
import { retrieveTokenValue } from "@shared/utils/jwt.util";

const userRepository = container.resolve(UserRepository);

const authMiddleware = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    let user;

    if (!req.headers || !req.headers.authorization) {
      throw new AppError(NOT_FOUND, "no authorization header found");
    }

    const authorization = req.headers.authorization.split(" ");

    const jwtToken = authorization[1];

    const jwtData = await retrieveTokenValue<{ id: string; }>(jwtToken);
      
    if (!jwtData) throw new AppError(UNAUTHORIZED, "Unauthorized user, login required");

    user = await userRepository.findUserById(jwtData.id);

    if (!user) throw new AppError(UNAUTHORIZED, "Unauthorized user, please login to continue");

    (req as any).user = user;

  } catch (error: any) {
    logger.error({error});

    if(error instanceof AppError)  return res.status(error.statusCode).send(ErrorResponse(error.message));

    return res.status(BAD_REQUEST).send(ErrorResponse("Bad authorization or expired token"));
  }
};

export default authMiddleware;
