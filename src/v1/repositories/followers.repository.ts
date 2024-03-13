import followersModel from "@v1/database/models/followers.model";
import { Transaction } from "objection";

export class followersRepository{
    public async getFollowers(userId) {
        return await followersModel.query().where({userId})
    };
    
    public async findUserById(id: string, trx?: Transaction) {
        return await followersModel.query(trx).where({id});
    };


    public async addFollowing(payload: Partial<followersModel>, trx?: Transaction){
        return await followersModel.query(trx).insert(payload);
    }

    public async removeFolowing(payload: any, trx?:Transaction){
        return await followersModel.query(trx).where({userId: payload.userId,  followerId:payload.followerId}).delete()
    }
}