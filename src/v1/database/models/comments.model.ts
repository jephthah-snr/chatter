import {Model} from 'objection'
import UserModel from './user.model';

export default class CommentModel extends Model{
    static tableName = 'comments'

    id!: string;
    postId!: string;
    userId!: string;
    comment!: string;

    static get relationMappings() {
        return {
          users: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserModel,
            join: {
              from: "comments.userId",
              to: "users.id",
            },
          }
        }
    }
    
}