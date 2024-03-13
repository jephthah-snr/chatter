import AppError from "@shared/utils/error.utils";
import { followersRepository } from "@v1/repositories/followers.repository";
import { UserRepository } from "@v1/repositories/user.repository";
import httpStatus from "http-status";
import { injectable } from "tsyringe";


@injectable()
export default class FollowersService {
  constructor(
    private readonly  followersRepo: followersRepository,
    private readonly  userRepo: UserRepository
    ){}

  public async followUser(payload: any) {
    try {
        const user = await this.userRepo.findUserById(payload.followerId)
        if(!user){
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Invalid user id')
        }

        if(payload.followerId === payload.userId) throw new AppError(httpStatus.BAD_REQUEST, "Users are not allowrd to follow themselves, we don to that here")

        const alreadyFollowing = await this.followersRepo.CheckFollowing(payload)

        if(alreadyFollowing) throw new AppError(httpStatus.CONFLICT, 'you are already following this account');

        return await this.followersRepo.addFollowing(payload)
    } catch (error: any) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
    }
  }

  public async unfollow(payload: any) {
    try {
        const user = await this.userRepo.findUserById(payload.followerId)
        if(!user){
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Invalid user id')
        }

        await this.followersRepo.removeFolowing(payload)
    } catch (error: any) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
    }
  }

  public async getFollowers(userId: any) {
    try {
        const user = await this.userRepo.findUserById(userId)
        if(!user){
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Invalid user id')
        }

        const followers = await this.followersRepo.getFollowers(userId)

        if(!followers){
            return []
        }

        return followers
    } catch (error: any) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
    }
  }

  public async getFollowing(userId: any) {
    try {
        const user = await this.userRepo.findUserById(userId)
        if(!user){
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Invalid user id')
        }
    
        const followers = await this.followersRepo.getFollowing(user.id)

        if(!followers){
            return []
        }

        return followers
    } catch (error: any) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
    }
  }
}
