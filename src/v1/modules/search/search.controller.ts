import { FastifyReply, FastifyRequest } from "fastify";
import { injectable } from "tsyringe";
import ProductSearchService from "./search.service";
import httpStatus from "http-status";
import { SuccessResponse } from "@shared/utils/response.util";



@injectable()
export default class SearchController{
    constructor(
        private readonly searchService: ProductSearchService
    ){}
    searchPosts = async (req: FastifyRequest, res: FastifyReply) => {
        const query = (req as any).query.q

        const result = await  this.searchService.SearchPosts(query);

        return res.status(httpStatus.OK).send(SuccessResponse(`search result found ${result.length} items`, result))
    }

    searchUser = async (req: FastifyRequest, res: FastifyReply) => {
        const query = (req as any).query.q

        const result = await  this.searchService.SearchUsers(query);

        return res.status(httpStatus.OK).send(SuccessResponse(`search result found ${result.length} drivers`, result))
    }
}




