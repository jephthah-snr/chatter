import { container } from "tsyringe";
import { FastifyPluginAsync } from "fastify";
import { Methods } from "@shared/enum/methods.enum";
import authMiddleware from "@shared/middlewares/auth.middleware";
import FollowersController from "./followers.controllers";



const controller = container.resolve(FollowersController)

const followersRoute: FastifyPluginAsync = async (fastify) => {
    fastify.route({
        url: "/follow/:id",
        method: Methods.POST,
        preHandler: [],
        onRequest: [authMiddleware],
        handler: controller.follow
    });

    fastify.route({
        url: "/unfollow/:id",
        method: Methods.DELETE,
        preHandler: [],
        onRequest: [authMiddleware],
        handler: controller.unfollow
    });

    fastify.route({
        url: "/followers-list",
        method: Methods.GET,
        preHandler: [],
        onRequest: [authMiddleware],
        handler: controller.getFollowers
    });

    fastify.route({
        url: "/following-list",
        method: Methods.GET,
        preHandler: [],
        onRequest: [authMiddleware],
        handler: controller.getFollowing
    });
    
}


export default followersRoute