import { Model, QueryContext } from "objection";
import UserModel from "./user.model";
import CommentModel from "./comments.model";
import likesModel from "./likes.model";
import bookmarkModel from "./bookmark.model";


export default class PostModel extends Model{
    static tableName = 'posts';

    id!: string;
    title!: string;
    content!: string;
    imageUrl!: string;
    likes!: string;
    authorId!: string;
    comments!: string;
    views!: number;
    duration!: number;
    slug!: string
    bookmarks!: string;
    created_at?: Date;
    updated_at?: Date;
    tags!: string;
    excerpt!: string;
    categories!: string;

    $beforeInsert(queryContext: QueryContext): void | Promise<any> {
        this.tags = JSON.stringify(this.tags)
    }

    $afterFind(queryContext: QueryContext): void | Promise<any> {
      this.tags = JSON.parse(this.tags)
    }

    static get relationMappings() {
        return {
          author: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserModel,
            join: {
              from: "posts.authorId",
              to: "users.id",
            },
          },

          users: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserModel,
            join: {
              from: "posts.comments.user.id",
              to: "users.id",
            },
          },

          comments: {
            relation: Model.HasManyRelation,
            modelClass: CommentModel,
            join: {
              from: "posts.id",
              to: "comments.postId",
            },
          },

          likes: {
            relation: Model.HasManyRelation,
            modelClass: likesModel,
            join: {
              from: "posts.id",
              to: "likes.postId",
            },
          },

          bookmarks: {
            relation: Model.HasManyRelation,
            modelClass: bookmarkModel,
            join: {
              from: "posts.id",
              to: "bookmarks.postId",
            },
          },
        };
      }
}