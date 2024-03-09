import { Model } from "objection";

export default class followingModel extends Model{
    static tableName = 'followers';

    id!: string;
    userId!: string;
    followingUserId!: string
    created_at!: Date;
    updated_at?: Date;

}