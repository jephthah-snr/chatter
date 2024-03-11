import CategoriesModel from "@v1/database/models/categories";
import { Transaction } from "objection";

export class CategoryRepository{
    public async findUsers() {
        return await CategoriesModel.query().withGraphFetched({'posts': true});
    };
    
    public async findById(id: string, trx?: Transaction) {
        return await CategoriesModel.query(trx).where({id}).first();
    };

    public async update(deviceId: string, payload: Partial<CategoriesModel>, trx?: Transaction){
        await CategoriesModel.query(trx).where({deviceId}).update(payload);
    };

    public async save(payload: Partial<CategoriesModel>, trx?: Transaction){
        return await CategoriesModel.query(trx).insert(payload)
    }

    public async delete(id: string, trx:Transaction){
        return await CategoriesModel.query(trx).deleteById(id)
    }
}