import likesModel from "@v1/database/models/likes.model";
import { Transaction } from "objection";

export class DeviceRepository{
    public async getLikes() {
        return await likesModel.query().withGraphFetched({'posts': true});
    };
    
    public async findUserById(id: string, trx?: Transaction) {
        return await likesModel.query(trx).where({id})
    };

    public async udateuser(id: string, payload: Partial<likesModel>, trx?: Transaction){
        await likesModel.query(trx).where({id}).update(payload);
    };

    public async saveUser(payload: Partial<likesModel>, trx?: Transaction){
        return await likesModel.query(trx).insert(payload)
    }

    public async deleteUser(id: string, trx:Transaction){
        return await likesModel.query(trx).deleteById(id)
    }
}