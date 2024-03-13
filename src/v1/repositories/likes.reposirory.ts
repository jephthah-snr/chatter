import likesModel from "@v1/database/models/likes.model";
import { Transaction } from "objection";

export class LikesRepository{
    public async like(payload: any) {
        return await likesModel.query().insert(payload)
    };

    public async unlike(id: string, trx?:Transaction){
        return await likesModel.query(trx).deleteById(id)
    }

    public async check(payload: any, trx?:Transaction){
        return await likesModel.query(trx).where(payload).first();
    }
}