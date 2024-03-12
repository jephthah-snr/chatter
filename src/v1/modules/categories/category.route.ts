import { container } from "tsyringe";
import { FastifyPluginAsync } from "fastify";
import { Methods } from "@shared/enum/methods.enum";

import authMiddleware from "@shared/middlewares/auth.middleware";
import CategoryController from "./category.controllers";




const controller = container.resolve(CategoryController)

const categoryRoute: FastifyPluginAsync = async (fastify) => {
    fastify.route({
        url: "/add-category",
        method: Methods.POST,
        preHandler: [],
        onRequest: [authMiddleware],
        handler: controller.addCategory
    })
    

    // fastify.route({
    //     url: "/remove-comment/:id",
    //     method: Methods.DELETE,
    //     preHandler: [],
    //     onRequest: [authMiddleware],
    //     handler: controller.deleteComment
    // });
}

export default categoryRoute