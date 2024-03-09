import { Model } from "objection";
import PostModel from "./post.model";

export default class likesModel extends Model{
    static tableName = 'likes';

    id!: string;
    postId!: string;
    userId!: string;
    created_at!: Date;
    updated_at?: Date;

    static get relationMappings() {
        return {
          post: {
            relation: Model.BelongsToOneRelation,
            modelClass: PostModel,
            join: {
              from: "likes.postId",
              to: "post.id",
            },
          },
        };
      }
}