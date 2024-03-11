import followingModel from "@v1/database/models/following.model";
import { Transaction } from "objection";

export class followingRepository{
    public async getLikes() {
        return await followingModel.query().withGraphFetched({'posts': true});
    };
    
    public async findByUserId(userId: string, trx?: Transaction) {
        return await followingModel.query(trx).where({userId})
    };


    public async findById(id: string, trx?: Transaction) {
        return await followingModel.query(trx).where({id})
    };

    public async addFollowing(payload: Partial<followingModel>, trx?: Transaction){
        return await followingModel.query(trx).insert(payload)
    }

    public async removeFollowing(id: string, trx:Transaction){
        return await followingModel.query(trx).deleteById(id)
    }
}