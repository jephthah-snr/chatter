import { injectable } from "tsyringe";
import commentService from "./comments.service";
import logger from "@shared/utils/logger";
import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorResponse, SuccessResponse } from "@shared/utils/response.util";
import httpStatus from "http-status";


//const userService = container.resolve(UserService);

@injectable()
export default class CommentController {
  constructor(
    private readonly userService: commentService
  ){}

  public addcomment = async (req: FastifyRequest, res: FastifyReply) => {
    const comment = (req as any).body.comment
    const userid = (req as any).user.id
    const postId =(req as any).params.id
    const payload = {
        userId: userid,
        postId: postId,
        comment: comment
    }
    const response = await this.userService.addComment(payload);

    return res.status(httpStatus.OK).send(SuccessResponse("comment added", response))
}

  deleteComment = async (
    req: FastifyRequest, reply: FastifyReply
  ) => {
    try {
      const response = await this.userService.deleteComment((req as any).params.id)

      return reply.send(SuccessResponse("comment deleted successfully", response));
    } catch (error: any) {
      logger.error({ error });

      return reply.send(ErrorResponse(error.message));
    }
  };

  getPostComment = async (
    req: FastifyRequest, reply: FastifyReply
  ) => {
    try {
      const response = await this.userService.getPostComment((req as any).params.id)

      return reply.send(SuccessResponse("post comment", response));
    } catch (error: any) {
      logger.error({ error });

      return reply.send(ErrorResponse(error.message));
    }
  };

}
