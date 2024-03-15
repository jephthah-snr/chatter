import CommentModel from "@v1/database/models/comments.model";
import { Transaction } from "objection";

export class CommentModelReposory{
    public async findComments() {
        return await CommentModel.query().withGraphFetched({'comments': true});
    };
    
    public async findById(id: string, trx?: Transaction) {
        return await CommentModel.query(trx).where({id}).first();
    };


    public async findByPost(id: string, trx?: Transaction) {
        return await CommentModel.query(trx).where({postId: id}).withGraphFetched({users: true})
    };

    public async save(payload: Partial<CommentModel>, trx?: Transaction){
        return await CommentModel.query(trx).insert(payload)
    }

    public async delete(id: string, trx?:Transaction){
        return await CommentModel.query(trx).deleteById(id)
    }
}