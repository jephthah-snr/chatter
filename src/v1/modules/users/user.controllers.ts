import { injectable } from "tsyringe";
import UserService from "./users.service";
import logger from "@shared/utils/logger";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorResponse, SuccessResponse } from "@shared/utils/response.util";
import httpStatus from "http-status";


//const userService = container.resolve(UserService);

@injectable()
export default class UserController {
  constructor(
    private readonly userService: UserService
  ){}

  public login = async (req: FastifyRequest, res: FastifyReply) => {
    const payload = (req as any).body
    const response = await this.userService.userlogin(payload);

    return res.status(httpStatus.OK).send(SuccessResponse("user logged in successfully", response))
}

  register = async (
    req: FastifyRequest, reply: FastifyReply
  ) => {
    try {
      const response = await this.userService.register((req as any).body)

      return reply.send(SuccessResponse("User logged in successfully", response));
    } catch (error: any) {
      logger.error({ error });

      return reply.send(ErrorResponse(error.message));
    }
  };

  userProfile = async (
    req: FastifyRequest, reply: FastifyReply
  ) => {
    try {
      const userId = (req as any).user.id
      const response = await this.userService.getUserData(userId)

      return reply.send(SuccessResponse("User profile", response));
    } catch (error: any) {
      logger.error({ error });

      return reply.send(ErrorResponse(error.message));
    }
  };
}
