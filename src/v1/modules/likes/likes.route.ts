import { container } from "tsyringe";
import { FastifyPluginAsync } from "fastify";
import { Methods } from "@shared/enum/methods.enum";
import LikesController from "./likes.controller";
import authMiddleware from "@shared/middlewares/auth.middleware";




const controller = container.resolve(LikesController)

const likesRoute: FastifyPluginAsync = async (fastify) => {
    fastify.route({
        url: "/like-post/:id",
        method: Methods.POST,
        preHandler: [],
        onRequest: [authMiddleware],
        handler: controller.like
    });

    fastify.route({
        url: "/unlike-post/:id",
        method: Methods.DELETE,
        preHandler: [],
        onRequest: [authMiddleware],
        handler: controller.unlike
    });
}


export default likesRoute