import { container } from "tsyringe";
import { FastifyPluginAsync } from "fastify";
import { Methods } from "@shared/enum/methods.enum";
import authMiddleware from "@shared/middlewares/auth.middleware";
import BookmarkController from "./bookmark.controller";



const controller = container.resolve(BookmarkController)

const bookmarkRoute: FastifyPluginAsync = async (fastify) => {
    fastify.route({
        url: "/save-bookmark",
        method: Methods.POST,
        preHandler: [],
        onRequest: [authMiddleware],
        handler: controller.addBookmark
    });

    fastify.route({
        url: "/remove-bookmark/:id",
        method: Methods.DELETE,
        preHandler: [],
        onRequest: [authMiddleware],
        handler: controller.removebookmark
    });

    fastify.route({
        url: "/remove-bookmark/:id",
        method: Methods.GET,
        preHandler: [],
        onRequest: [authMiddleware],
        handler: controller.getUserBookmarks
    });
}


export default bookmarkRoute