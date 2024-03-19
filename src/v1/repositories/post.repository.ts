import PostModel from "@v1/database/models/post.model";
import { Transaction } from "objection";
import knexConfig from "../../../knexfile";
import knex from "knex";


export class PostRepository{
    public async getPosts() {
        return await PostModel.query().withGraphFetched({
            "comments": true,
            author: true,
            likes: true,
            bookmarks: true
        }).orderBy('created_at', 'desc');
    };

//     async getPosts() {
//         try {
//           const driverDistanceQuery = `
//           SELECT 
//           posts.*, 
//           comments.*, 
//           users.*, 
//           likes.*, 
//           bookmarks.*
//       FROM 
//           posts
//       LEFT JOIN 
//           comments ON posts.id = comments.post_id
//       LEFT JOIN 
//           users ON comments.user_id = users.id
//       LEFT JOIN 
//           likes ON posts.id = likes.post_id
//       LEFT JOIN 
//           bookmarks ON posts.id = bookmarks.post_id
//       WHERE 
//           posts.title LIKE ?
//   `;
      
//           const response = await this.rawQuery(driverDistanceQuery);
//           return response;
//         } catch (error) {
//           console.error('Error fetching drivers:', error);
//           throw error;
//         }
//       }
      
      async rawQuery(query: string) {
        const db = knex(knexConfig);
        try {
            db.client = "postgresql"
          const result = await db.raw(query);
          return result.rows;
        } catch (error) {
          console.error('Error executing raw SQL query:', error);
          throw error; 
        } finally {
          await db.destroy();
        }
      }
    
    public async findPostById(id: string, trx?: Transaction) {
        return await PostModel.query(trx).findById(id).first().withGraphFetched({comments: {
            users: true
        }, author: true, likes: true, bookmarks: true});
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

    public async trandingPosts() {
        return await PostModel.query()
            .where('views', '>', 20)
            .withGraphFetched({
                author: true,
                likes: true,
                bookmarks: true
            })
            .orderBy('created_at', 'desc');
    };
    
    
}