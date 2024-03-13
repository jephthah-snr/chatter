import PostModel from "@v1/database/models/post.model";
import { Transaction } from "objection";

export class PostRepository{
    public async getPosts() {
        return await PostModel.query().withGraphFetched({'comments': true, author: true, likes: true, bookmarks: true});
    };
    
    public async findPostById(id: string, trx?: Transaction) {
        return await PostModel.query(trx).findById(id).first().withGraphFetched({'comments': true, author: true, likes: true, bookmarks: true});
    };

    public async updatePost(id: string, payload: any, trx?: Transaction){
        return await PostModel.query(trx).findById(id).update(payload);
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