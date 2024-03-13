import { injectable } from "tsyringe";
import FollowersService from "./followers.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { SuccessResponse } from "@shared/utils/response.util";
import httpStatus from "http-status";


//const userService = container.resolve(UserService);

@injectable()
export default class FollowersController {
  constructor(
    private readonly followersService: FollowersService
  ){}

    public follow = async (req: FastifyRequest, res: FastifyReply) => {
        const userId = (req as any).user.id
        const followerId =(req as any).params.id
        const payload = {
            userId: followerId,
            followerId: userId,
        }
        const response = await this.followersService.followUser(payload);

        return res.status(httpStatus.OK).send(SuccessResponse("now following user", response))
    }

    public unfollow = async (req: FastifyRequest, res: FastifyReply) => {
        const userid = (req as any).user.id
        const followerId =(req as any).params.id
        const payload = {
            userId: userid,
            followerId: followerId,
        }
        const response = await this.followersService.unfollow(payload);

        return res.status(httpStatus.OK).send(SuccessResponse("user unfollowed sucesffully", response))
    }

    public getFollowers = async (req: FastifyRequest, res: FastifyReply) => {
        const userid = (req as any).user.id

        const response = await this.followersService.getFollowers(userid);

        return res.status(httpStatus.OK).send(SuccessResponse("user followers", response))
    }

    public getFollowing = async (req: FastifyRequest, res: FastifyReply) => {
        const userid = (req as any).user.id

        const response = await this.followersService.getFollowing(userid);

        return res.status(httpStatus.OK).send(SuccessResponse("user followers", response))
    }
    
}