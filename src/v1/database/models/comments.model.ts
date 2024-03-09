import {Model} from 'objection'

export default class CommentModel extends Model{
    static tableName = 'comments'

    id!: string;
    postId!: string;
    userId!: string;
    comment!: string;
    
}