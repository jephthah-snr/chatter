import { injectable } from "tsyringe";
import { FastifyReply, FastifyRequest } from "fastify";
import { SuccessResponse } from "@shared/utils/response.util";
import httpStatus from "http-status";
import bookMArkService from "./bookmark.service";



//const userService = container.resolve(UserService);

@injectable()
export default class BookmarkController {
  constructor(
    private readonly bookmarkService: bookMArkService
  ){}

    public addBookmark = async (req: FastifyRequest, res: FastifyReply) => {
        const bookmark = (req as any).body
        const user = (req as any).user
        const newPayload = {
            ...bookmark, userId: user.id
        }
        const response = await this.bookmarkService.addBookmark(newPayload);
        return res.status(httpStatus.OK).send(SuccessResponse("bookmark added", response))
    }

    public getUserBookmarks = async (req: FastifyRequest, res: FastifyReply) => {
    const userId = (req as any).user.id
    const response = await this.bookmarkService.showBookmarks(userId);
    return res.status(httpStatus.OK).send(SuccessResponse("users bookmarks", response))
    }

    public removebookmark = async (req: FastifyRequest, res: FastifyReply) => {
    const bookmarkId = (req as any).params.id
    const response = await this.bookmarkService.removeBookmark(bookmarkId)
    return res.status(httpStatus.OK).send(SuccessResponse("Bookmark removed", response))
    }
}
