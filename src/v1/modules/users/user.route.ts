import { container } from "tsyringe";
import { FastifyPluginAsync } from "fastify";
import { Methods } from "@shared/enum/methods.enum";
//import authMiddleware from "@shared/middlewares/auth.middleware";
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
        handler: controller.login
    });

    // fastify.route({
    //     url: "/login",
    //     method: Methods.POST,
    //     preHandler: [],
    //     onRequest: authMiddleware,
    //     handler: controller.login
    // });
}

export default usersRoute