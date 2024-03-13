import AppError from "@shared/utils/error.utils";
import httpStatus from "http-status";
import { LikesRepository } from "@v1/repositories/likes.reposirory";
import { injectable } from "tsyringe";

@injectable()
export default class LikesService{
    constructor(
        private readonly likesRepository: LikesRepository
    ){}

    public async likepost(payload: any){
        try {
            const check = await this.likesRepository.check(payload)

            if(check){
                throw new AppError(httpStatus.CONFLICT, "post already likes")
            }
            await this.likesRepository.like(payload)
        } catch (error: any) {
           throw error
        }
    }

    public async unlikepost(payload: any){
        try {
            console.log(payload)
            const likeData = await this.likesRepository.check({postId: payload.postId, userId: payload.userId});
            if(likeData){
                await this.likesRepository.unlike(likeData.id)
            }
          
        } catch (error: any) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
        }
    }

}