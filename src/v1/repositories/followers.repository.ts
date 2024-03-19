import followersModel from "@v1/database/models/followers.model";
import { Transaction } from "objection";

export class followersRepository{
    public async getFollowers(userId, trx?: Transaction) {
        return await followersModel.query(trx).where({followerId: userId})
    };

    public async getFollowing(userId: string, trx?:Transaction){
        console.log(userId)
        return await followersModel.query(trx).where({userId})
       
    }

    
    public async findUserById(id: string, trx?: Transaction) {
        return await followersModel.query(trx).where({id});
    };


    public async addFollowing(payload: any, trx?: Transaction){
        return await followersModel.query(trx).insert({
            userId: payload.userId,
            followerId: payload.toFollowAccountId
        });
    }

    public async removeFolowing(payload: any, trx?:Transaction){
        return await followersModel.query(trx).where({userId: payload.userId,  followerId:payload.followerId}).delete()
    }

    public async CheckFollowing(payload: any, trx?:Transaction){
        return await followersModel.query(trx).where({userId: payload.userId, followerId: payload.toFollowAccountId}).first()
    }

    public async findFollowing(id: any, trx?:Transaction){
        return await followersModel.query(trx).where({followerId: id}).first()
    }

    public async deleteFollowing(id: string){
        return await followersModel.query().deleteById(id)
    }
}