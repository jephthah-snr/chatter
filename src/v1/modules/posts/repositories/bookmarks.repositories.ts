// import bookmarkModel from "../../../database/models/bookmark.model"
// import { Transaction } from "objection";

// export class CategoryRepository{
//     public async findUsers() {
//         return await bookmarkModel.query().withGraphFetched({'posts': true});
//     };
    
//     public async findById(id: string, trx?: Transaction) {
//         return await bookmarkModel.query(trx).where({id}).first();
//     };

//     public async update(deviceId: string, payload: Partial<bookmarkModel>, trx?: Transaction){
//         await bookmarkModel.query(trx).where({deviceId}).update(payload);
//     };

//     public async save(payload: Partial<bookmarkModel>, trx?: Transaction){
//         return await bookmarkModel.query(trx).insert(payload)
//     }

//     public async delete(id: string, trx:Transaction){
//         return await bookmarkModel.query(trx).deleteById(id)
//     }
// }