import "reflect-metadata";
import "module-alias/register";
import fastify, { FastifyInstance } from "fastify";
import * as dotenv from "dotenv";
import { Server, IncomingMessage, ServerResponse } from "http";
import { AppConfig } from "@configurations/app.config";
import initializeDatabase from "./v1/database";
import healthRoute from "./v1/modules/health/health.route";
import Validator from "validatorjs";
import cors from "fastify-cors";
import { baseRoute } from "@v1/modules/sample/routes/base.route";
import { sampleRoute } from "@v1/modules/sample/routes/sample.route";
import { RouteVersion } from "@configurations/route.config";
import usersRoute from "@v1/modules/users/user.route";
import PostRoute from "@v1/modules/posts/routes/main.route";
import commentRoute from "@v1/modules/comments/comment.route";
import categoryRoute from "@v1/modules/categories/category.route";
import bookmarkRoute from "@v1/modules/bookmark/bookmark.route";
import followersRoute from "@v1/modules/followers/followers.route";
import likesRoute from "@v1/modules/likes/likes.route";
import SearchRoute from "@v1/modules/search/search.route";

dotenv.config({ path: process.cwd() + "/.env" });

class App {
  protected app_port: number = AppConfig.port || 3000;
  public app: FastifyInstance<Server, IncomingMessage, ServerResponse>;

  constructor() {
    this.app = fastify({ logger: true });
    this.app.register(cors, { origin: true });
    this.app.register(baseRoute);
    this.app.register(healthRoute);
    this.app.register(sampleRoute, { prefix: RouteVersion.sample });
    this.app.register(usersRoute, {prefix: RouteVersion.user});
    this.app.register(PostRoute, {prefix: RouteVersion.post});
    this.app.register(commentRoute, {prefix: RouteVersion.comment});
    this.app.register(categoryRoute, {prefix: RouteVersion.category});
    this.app.register(bookmarkRoute, { prefix: RouteVersion.bookmark});
    this.app.register(followersRoute, {prefix: RouteVersion.followers});
    this.app.register(likesRoute, {prefix: RouteVersion.likes});
    this.app.register(SearchRoute, {prefix: RouteVersion.search});
    this.bootstrapDependencies();
    this.listen();
  }

  async bootstrapDependencies() {
    initializeDatabase();
    this.registerCustomValidationRules();
  }

  public getInstance() {
    return this.app;
  }

  public async close() {
    await this.app.close();
  }

  public registerCustomValidationRules() {
    // initialize custom validations for validatorjs
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    Validator.register(
      "uuid",
      (value: string) => {
        return uuidRegex.test(value);
      },
      ":attribute is not a valid UUID"
    );
  }

  public listen() {
    this.app.listen(this.app_port, "0.0.0.0");
  }
}
export default App;
