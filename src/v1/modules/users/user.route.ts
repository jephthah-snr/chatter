import { container } from "tsyringe";
import { FastifyPluginAsync } from "fastify";
import { Methods } from "@shared/enum/methods.enum";
import authMiddleware from "@shared/middlewares/auth.middleware";
import UserController from "./user.controllers";



const controller = container.resolve(UserController)

const usersRoute: FastifyPluginAsync = async (fastify) => {
    fastify.route({
        url: "/login",
        method: Methods.POST,
        preHandler: [],
        onRequest: [],
        handler: controller.login
    });

    fastify.route({
        url: "/register",
        method: Methods.POST,
        preHandler: [],
        onRequest: [],
        handler: controller.register
    });

    fastify.route({
        url: "/google/register",
        method: Methods.POST,
        preHandler: [],
        onRequest: [],
        handler: controller.googleAuth
    });

    fastify.route({
        url: "/profile",
        method: Methods.GET,
        preHandler: [],
        onRequest: authMiddleware,
        handler: controller.userProfile
    });

    fastify.route({
        url: "/profile/image-update",
        method: Methods.PUT,
        preHandler: [],
        onRequest: authMiddleware,
        handler: controller.userProfileImage
    });

    fastify.route({
        url: "/profile/username",
        method: Methods.GET,
        preHandler: [],
        onRequest: authMiddleware,
        handler: controller.searchUserbyUsername
    });
}

export default usersRoute