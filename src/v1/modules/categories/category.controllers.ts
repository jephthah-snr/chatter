import { injectable } from "tsyringe";
import { FastifyReply, FastifyRequest } from "fastify";
import { SuccessResponse } from "@shared/utils/response.util";
import httpStatus from "http-status";
import categoryService from "./categories.service";


//const userService = container.resolve(UserService);

@injectable()
export default class CategoryController {
  constructor(
    private readonly userService: categoryService
  ){}

  public addCategory = async (req: FastifyRequest, res: FastifyReply) => {
    const category = (req as any).body
    const response = await this.userService.addCategory(category);

    return res.status(httpStatus.OK).send(SuccessResponse("comment added", response))
}

//   deleteComment = async (
//     req: FastifyRequest, reply: FastifyReply
//   ) => {
//     try {
//       const response = await this.userService.((req as any).params.id)

//       return reply.send(SuccessResponse("comment deleted successfully", response));
//     } catch (error: any) {
//       logger.error({ error });

//       return reply.send(ErrorResponse(error.message));
//     }
//   };
}
