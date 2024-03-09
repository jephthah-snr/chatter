import { Model } from "objection";
import PostModel from "./post.model";
import followersModel from "./categories";
import followingModel from "./following.model";
export default class UserModel extends Model{
    static tableName = 'users';

    id!: string;
    first_name!: string;
    last_name!: string;
    user_name!: string;
    email!: string;
    role!: string;
    pasword?: string;
    created_at?: Date;
    updated_at?: Date;

    static get relationMappings() {
        return {
          post: {
            relation: Model.HasManyRelation,
            modelClass: PostModel,
            join: {
              from: "user.id",
              to: "post.authorId",
            },
          },
        };
      }
}