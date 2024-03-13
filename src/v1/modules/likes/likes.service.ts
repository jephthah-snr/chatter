import AppError from "@shared/utils/error.utils";
import httpStatus from "http-status";
import { LikesRepository } from "@v1/repositories/likes.reposirory";
import { injectable } from "tsyringe";

@injectable()
export default class bookMArkService{
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
            const bookmark = await this.likesRepository.check(payload.id);
            console.log(bookmark)
            if(!bookmark){
                throw new AppError(httpStatus.NOT_ACCEPTABLE, "invalid or malformed data passed as bookmark")
            }
            await this.likesRepository.unlike(payload.id)
        } catch (error: any) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
        }
    }

}