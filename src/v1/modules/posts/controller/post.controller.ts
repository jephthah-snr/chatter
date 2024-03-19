import { injectable } from "tsyringe";
import PostService from "../services/post.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { SuccessResponse } from "@shared/utils/response.util";
import httpStatus from "http-status";


//const userService = container.resolve(UserService);

@injectable()
export default class PostController {
  constructor(
    private readonly userService: PostService
  ){}

  public newPost = async (req: FastifyRequest, res: FastifyReply) => {
    const payload = (req as any).body
    const id = (req as any).user.id
    const response = await this.userService.addPost(id, payload);

    return res.status(httpStatus.OK).send(SuccessResponse("new post added", response))
}

public updatePost = async (req: FastifyRequest, res: FastifyReply) => {
    const payload = (req as any).body
    const id = (req as any).user.id
    const response = await this.userService.updatePost(id, payload);

    return res.status(httpStatus.OK).send(SuccessResponse("Post updated", response))
}


public getAll = async (req: FastifyRequest, res: FastifyReply) => {
    const response = await this.userService.getAllPosts();

    return res.status(httpStatus.OK).send(SuccessResponse("new post added", response))
}


public tranding = async (req: FastifyRequest, res: FastifyReply) => {
    const response = await this.userService.tranding();

    return res.status(httpStatus.OK).send(SuccessResponse("tranding posts", response))
}


public getSingle = async (req: FastifyRequest, res: FastifyReply) => {
    const id = (req as any).params.id
    const response = await this.userService.getPostById(id);

    return res.status(httpStatus.OK).send(SuccessResponse("new post added", response))
}


public getAuthorPosts = async (req: FastifyRequest, res: FastifyReply) => {
    const id = (req as any).user.id
    const response = await this.userService.getUserPost(id);

    return res.status(httpStatus.OK).send(SuccessResponse("new post added", response))
}

public updatePostViews = async (req: FastifyRequest, res: FastifyReply) => {
    const id = (req as any).params.id
    const response = await this.userService.updatePostViews(id);

    return res.status(httpStatus.OK).send(SuccessResponse("new post added", response))
}

}