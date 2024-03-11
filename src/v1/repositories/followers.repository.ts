import followersModel from "@v1/database/models/followers.model";
import { Transaction } from "objection";

export class followingRepository{
    public async getFollowers() {
        return await followersModel.query().withGraphFetched({'posts': true});
    };
    
    public async findUserById(id: string, trx?: Transaction) {
        return await followersModel.query(trx).where({id});
    };


    public async addFollowing(payload: Partial<followersModel>, trx?: Transaction){
        return await followersModel.query(trx).insert(payload);
    }

    public async removeFolowing(id: string, trx:Transaction){
        return await followersModel.query(trx).deleteById(id);
    }
}