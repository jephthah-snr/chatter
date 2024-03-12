import { Model } from "objection";

export default class CategoriesModel extends Model{
    static tableName = 'categories';

    id!: string;
    name!: string
    created_at!: Date;
    updated_at?: Date;

}