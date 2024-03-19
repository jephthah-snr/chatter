import { Model } from "objection";
import UserModel from "./user.model";

export default class followersModel extends Model{
    static tableName = 'followers';

    id!: string;
    userId!: string;
    followerId!: string;
    created_at!: Date;
    updated_at?: Date;

    static get relationMappings() {
        return {
          followers: {
            relation: Model.HasManyRelation,
            modelClass: UserModel,
            join: {
              from: "followers.userId",
              to: "users.id",
            },
          },
          following: {
            relation: Model.HasManyRelation,
            modelClass: UserModel,
            join: {
              from: "followers.followerId",
              to: "users.id",
            },
          },
        };
      }

}