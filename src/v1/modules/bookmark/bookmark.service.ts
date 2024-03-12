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
            const check = await this.bookmarkrepo.checkExists(payload)

            if(check){
                throw new AppError(httpStatus.CONFLICT, "post already bookmarked")
            }
            await this.bookmarkrepo.save(payload)
        } catch (error: any) {
           throw error
        }
    }

    public async removeBookmark(id: string){
        try {
            const bookmark = await this.bookmarkrepo.findById(id);
            console.log(bookmark)
            if(!bookmark){
                throw new AppError(httpStatus.NOT_ACCEPTABLE, "invalid or malformed data passed as bookmark")
            }
            await this.bookmarkrepo.delete(id)
        } catch (error: any) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
        }
    }

    public async showBookmarks(id: string){
        try {
           const bookmarks =  await this.bookmarkrepo.findByUser(id)
           if(!bookmarks){
            return []
           }
           return bookmarks
        } catch (error: any) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
        }
    }
}