import { ObjectLiteral } from "@shared/types/object-literal.type";
import AppError from "@shared/utils/error.utils";
import { PostRepository } from "@v1/repositories/post.repository";
import httpStatus from "http-status";
import { injectable } from "tsyringe";


@injectable()
export default class SampleService {
  constructor(
    private readonly  postRepo: PostRepository
    ){}

  public async addPost(authorId: string, payload: any) {
    try {
      payload.author = authorId
      const post =  await this.postRepo.savePost(payload);
      return post
    } catch (error: any) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
    }
  }

  public async updatePost(id: string, payload: ObjectLiteral){
    try {
      if(!id || payload) throw new AppError(httpStatus.BAD_REQUEST, "invalid update data")

      const post = await this.postRepo.findPostById(id)

      if(!post) throw new AppError(httpStatus.NOT_FOUND, "invalid or malfoemed post id")

      const updated =  await this.postRepo.updatePost(id, payload)

      return updated
    } catch (error: any) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
    }
  }

  public async getAllPosts(){
    try {

      const post = await this.postRepo.getPosts();

      if(!post) {
        return []
      }

      return post
    } catch (error: any) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
    }
  }

  public async getPostById(id){
    try {
      if(!id)throw new AppError(httpStatus.BAD_REQUEST, "invlid data")
      const post = await this.postRepo.getPosts();

      if(!post) {
        return []
      }

      return post
    } catch (error: any) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
    }
  }

  public async getUserPost(userId: string){
    try {

      const post = await this.postRepo.getPostByUser(userId)

      if(!post) {
        return []
      }

      return post
    } catch (error: any) {
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
    }
  }

  // public async getAllPosts(){
  //   try {

  //     const post = await this.postRepo.getPosts();

  //     if(!post) {
  //       return []
  //     }

  //     return post
  //   } catch (error: any) {
  //     throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
  //   }
  // }
}
