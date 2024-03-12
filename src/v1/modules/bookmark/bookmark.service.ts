import AppError from "@shared/utils/error.utils";
import httpStatus from "http-status";
import { BookmarkRepository } from "@v1/repositories/bookmarks.repositories";
import { injectable } from "tsyringe";

@injectable()
export default class bookMArkService{
    constructor(
        private readonly bookmarkrepo: BookmarkRepository
    ){}

    public async addBookmark(payload: any){
        try {
            await this.bookmarkrepo.save(payload)
        } catch (error: any) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    public async removeBookmark(id: string){
        try {
            await this.bookmarkrepo.delete(id)
        } catch (error: any) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
        }
    }
}