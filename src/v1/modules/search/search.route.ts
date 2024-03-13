
import { FastifyPluginAsync } from 'fastify';
import { container } from 'tsyringe';
import { Methods } from '@shared/enum/methods.enum';
import SearchController from './search.controller';
import authMiddleware from '@shared/middlewares/auth.middleware';

const controller = container.resolve(SearchController);


const SearchRoute: FastifyPluginAsync = async (fastify) => {
    fastify.route({
        url: "/users",
        method: Methods.GET,
        preHandler: [],
        onRequest: [authMiddleware],
        handler: controller.searchUser
    });

    fastify.route({
        url: "/posts",
        method: Methods.GET,
        preHandler: [],
        onRequest: [authMiddleware],
        handler: controller.searchPosts
    });

    
}


export default SearchRoute