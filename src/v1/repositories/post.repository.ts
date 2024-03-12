import PostModel from "@v1/database/models/post.model";
import { Transaction } from "objection";

export class PostRepository{
    public async getPosts() {
        return await PostModel.query().withGraphFetched({'comments': true});
    };
    
    public async findPostById(id: string, trx?: Transaction) {
        return await PostModel.query(trx).where({id}).withGraphFetched({'comments': true}).first();
    };

    public async updatePost(id: string, payload: Partial<PostModel>, trx?: Transaction){
        await PostModel.query(trx).where({id}).update(payload);
    };

    public async savePost(payload: Partial<PostModel>, trx?: Transaction){
        return await PostModel.query(trx).insert(payload)
    }

    public async deletePost(id: string, trx?:Transaction){
        return await PostModel.query(trx).deleteById(id)
    }

    public async getPostByUser(authorId: string, trx?: Transaction){
        return await PostModel.query(trx).where({authorId})
    }
}