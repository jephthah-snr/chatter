import AppError from "@shared/utils/error.utils";
import httpStatus from "http-status";
import { CommentModelReposory } from "@v1/repositories/comments.repository";
import { injectable } from "tsyringe";


@injectable()
export default class commentService{
    constructor(
        private commentRepo: CommentModelReposory
    ){}


    public async addComment(commentData: {postId: string, comment: string, userId: string}){
        try {
            await this.commentRepo.save(commentData)
        } catch (error: any) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    public async deleteComment(commentId: string){
        try {
            await this.commentRepo.delete(commentId)
        } catch (error: any) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    public async getPostComment(commentId: string){
        try {
            return await this.commentRepo.findByPost(commentId)
        } catch (error: any) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
        }
    }
}