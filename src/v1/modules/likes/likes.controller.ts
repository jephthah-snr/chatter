import { injectable } from "tsyringe";
import LikesService from "./likes.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { SuccessResponse } from "@shared/utils/response.util";
import httpStatus from "http-status";


//const userService = container.resolve(UserService);

@injectable()
export default class LikesController {
  constructor(
    private readonly likesService: LikesService
  ){}

    public like = async (req: FastifyRequest, res: FastifyReply) => {
        const userId = (req as any).user.id
        const postId =(req as any).params.id
        const payload = {
            userId: userId,
            postId: postId,
        }
        await this.likesService.likepost(payload);
        return res.status(httpStatus.OK).send(SuccessResponse("Post liked", {}))
    }


    public unlike = async (req: FastifyRequest, res: FastifyReply) => {
        const userId = (req as any).user.id
        const postId =(req as any).params.id
        const payload = {
            userId: userId,
            postId: postId,
        }
        await this.likesService.unlikepost(payload);
        return res.status(httpStatus.OK).send(SuccessResponse("Post unliked"))
    }
}