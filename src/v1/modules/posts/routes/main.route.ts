import { container } from "tsyringe";
import { FastifyPluginAsync } from "fastify";
import { Methods } from "@shared/enum/methods.enum";
import PostController from "../controller/post.controller";
import authMiddleware from "@shared/middlewares/auth.middleware";


const controller = container.resolve(PostController)

const PostRoute: FastifyPluginAsync = async (fastify) => {
    fastify.route({
        url: "/",
        method: Methods.GET,
        preHandler: [],
        onRequest: authMiddleware,
        handler: controller.getAll
    });

    fastify.route({
        url: "/:id",
        method: Methods.GET,
        preHandler: [],
        onRequest: [],
        handler: controller.getSingle
    });

    fastify.route({
        url: "/author-posts",
        method: Methods.GET,
        preHandler: [],
        onRequest: authMiddleware,
        handler: controller.getAuthorPosts
    });

    fastify.route({
        url: "/new",
        method: Methods.POST,
        preHandler: [],
        onRequest: authMiddleware,
        handler: controller.newPost
    });


    fastify.route({
        url: "/update/:id",
        method: Methods.PUT,
        preHandler: [],
        onRequest: authMiddleware,
        handler: controller.updatePost
    });

    fastify.route({
        url: "/update-view/:id",
        method: Methods.PUT,
        preHandler: [],
        onRequest: authMiddleware,
        handler: controller.updatePostViews
    });
    
    fastify.route({
        url: "/tranding",
        method: Methods.GET,
        preHandler: [],
        onRequest: authMiddleware,
        handler: controller.tranding
    });
}

export default PostRoute