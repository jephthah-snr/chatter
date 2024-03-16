import { Model } from "objection";
import PostModel from "./post.model";
import UserModel from "./user.model";

export default class bookmarkModel extends Model{
    static tableName = 'bookmarks';

    id!: string;
    postId!: string;
    userId!: string;
    created_at!: Date;
    updated_at?: Date;

    static get relationMappings() {
        return {
          posts: {
            relation: Model.BelongsToOneRelation,
            modelClass: PostModel,
            join: {
              from: "bookmarks.postId",
              to: "posts.id",
            },
          },
          author: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserModel,
            join: {
              from: "bookmarks.userId",
              to: "users.id",
            },
          },
        };
      }
}