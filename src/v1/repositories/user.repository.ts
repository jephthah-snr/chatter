import UserModel from "@v1/database/models/user.model";
import { Transaction } from "objection";

export class UserRepository{
    public async findUsers() {
        return await UserModel.query().withGraphFetched({'posts': true});
    };
    
    public async findUserById(id: string, trx?: Transaction) {
        console.log("searching by Id...", id)
        return await UserModel.query(trx).findById(id)
    };

    public async findUserByEmail(email: string, trx?: Transaction) {
        return await UserModel.query(trx).where({email}).first();
    };

    public async udateuser(deviceId: string, payload: Partial<UserModel>, trx?: Transaction){
        await UserModel.query(trx).where({deviceId}).update(payload);
    };

    public async saveUser(payload: any, trx?: Transaction){
        console.log(payload)
        return await UserModel.query(trx).insert(payload)
    }

    public async deleteUser(id: string, trx:Transaction){
        return await UserModel.query(trx).deleteById(id)
    }
}