import { container } from "tsyringe";
import { FastifyPluginAsync } from "fastify";
import { Methods } from "@shared/enum/methods.enum";
import CommentController from "./coments.controllers";
import authMiddleware from "@shared/middlewares/auth.middleware";




const controller = container.resolve(CommentController)

const commentRoute: FastifyPluginAsync = async (fastify) => {
    fastify.route({
        url: "/add-comment/:id",
        method: Methods.POST,
        preHandler: [],
        onRequest: [authMiddleware],
        handler: controller.addcomment
    });

    fastify.route({
        url: "/remove-comment/:id",
        method: Methods.DELETE,
        preHandler: [],
        onRequest: [authMiddleware],
        handler: controller.deleteComment
    });
}

export default commentRoute