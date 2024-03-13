import likesModel from "@v1/database/models/likes.model";
import { Transaction } from "objection";

export class DeviceRepository{
    public async like(payload: any) {
        return await likesModel.query().insert(payload)
    };

    public async unlike(id: string, trx:Transaction){
        return await likesModel.query(trx).deleteById(id)
    }
}