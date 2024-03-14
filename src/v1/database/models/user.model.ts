import { Model } from "objection";
import PostModel from "./post.model";
// import followersModel from "./categories";
// import followingModel from "./following.model";
export default class UserModel extends Model{
    static tableName = 'users';

    id!: string;
    first_name!: string;
    last_name!: string;
    user_name!: string;
    email!: string;
    role!: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;

    // async $afterFind() {
    //   delete(this.password)
    // }
    // static get jsonSchema() {
    //   return {
    //     type: 'object',
    //     required: [],

    //     id: { type: "string"},
    //     first_name: { type: "string"},
    //     last_name: { type: "string"},
    //     user_name:{ type: "string"},
    //     email: { type: "string"},
    //     role: { type: "string"},
    //     password: { type: "string"},

    //   }
    // }

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