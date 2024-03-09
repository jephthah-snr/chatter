import { Model } from "objection";
import UserModel from "./user.model";
import CommentModel from "./comments.model";
import likesModel from "./likes.model";

export default class PostModel extends Model{
    static tableName = 'posts';

    id!: string;
    title!: string;
    content!: string;
    imageUrl!: string;
    likes!: string;
    authorId!: string;
    comments!: string;
    bookmarks!: string;
    created_at?: Date;
    updated_at?: Date;

    static get relationMappings() {
        return {
          user: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserModel,
            join: {
              from: "posts.authorId",
              to: "users.id",
            },
          },

          comments: {
            relation: Model.BelongsToOneRelation,
            modelClass: CommentModel,
            join: {
              from: "posts.id",
              to: "comment.postId",
            },
          },

          likes: {
            relation: Model.BelongsToOneRelation,
            modelClass: likesModel,
            join: {
              from: "posts.id",
              to: "likes.postId",
            },
          },

          bookmarks: {
            relation: Model.BelongsToOneRelation,
            modelClass: CommentModel,
            join: {
              from: "posts.id",
              to: "bookmarks.postId",
            },
          },
        };
      }
}