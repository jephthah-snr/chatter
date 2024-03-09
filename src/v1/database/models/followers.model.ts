import { Model } from "objection";

export default class followersModel extends Model{
    static tableName = 'followers';

    id!: string;
    userId!: string;
    followerId!: string
    created_at!: Date;
    updated_at?: Date;

}