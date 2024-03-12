import { injectable } from "tsyringe";
import UserService from "./users.service";
import logger from "@shared/utils/logger";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorResponse, SuccessResponse } from "@shared/utils/response.util";

@injectable()
export default class UserController {
  private readonly userService: UserService

  login = async (
    req: FastifyRequest, reply: FastifyReply
  ) => {
    try {
      const response = await this.userService.userLogin((req as any).body)

      return reply.send(SuccessResponse("User logged in successfully", {token: response}));
    } catch (error: any) {
      logger.error({ error });

      return reply.send(ErrorResponse(error.message));
    }
  };

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

//   login = async (
//     req: FastifyRequest, reply: FastifyReply
//   ) => {
//     try {
//       const response = await this.userService.userLogin((req as any).body)

//       return reply.send(SuccessResponse("User logged in successfully", {token: response}));
//     } catch (error: any) {
//       logger.error({ error });

//       return reply.send(ErrorResponse(error.message));
//     }
//   };
}
