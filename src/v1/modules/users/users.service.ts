import AppError from "@shared/utils/error.utils";
import { UserRepository } from "@v1/repositories/user.repository";
import httpStatus from "http-status";
import { injectable } from "tsyringe";
import PasswordHelper from "@v1/helpers/password.helper";
import { signToken } from "@shared/utils/jwt.util";
import FollowersService from "../followers/followers.service";
import PostService from "../posts/services/post.service";
import { uploader } from "@shared/utils/imageUpload.util";


@injectable()
export default class UserService{
    constructor(
        private readonly userRepo: UserRepository,
        private readonly passwordHelper: PasswordHelper,
        private readonly followersService:FollowersService,
        private readonly postService:PostService
    ){};

    public async findAll(): Promise<any[]>{
     const users =  await this.userRepo.findUsers()

     if(!users || users.length === 0){
        return []
     }

     return users
    }


    public async userlogin(payload: {email: string, password: string}): Promise<string>{
        try {
            const user = await this.userRepo.findUserByEmail(payload.email)

            if(!user) throw new AppError(httpStatus.UNAUTHORIZED, "invalid login details");

            const isPassword = await this.passwordHelper.compare(payload.password, String(user.password))

            if(!isPassword) throw new AppError(httpStatus.UNAUTHORIZED, "Invalid login details");

            const token = await signToken({id: user.id})

            return token
        } catch (error) {
          throw error;
        }
      }

    public async register(payload: any){
        try {

            const emailExists = await this.userRepo.findUserByEmail(payload.email);

            const userNameExists = await this.userRepo.findUserByUsername(payload.user_name);
    
            if(emailExists ?? userNameExists) {
               if(emailExists){
                throw new AppError(httpStatus.CONFLICT, "Email already used, try another");
               }else{
                throw new AppError(httpStatus.CONFLICT, "UserName already used, try another");
               }
            }
    
            const hashedPassword = await this.passwordHelper.hashPassword(payload.password);
    
            const newUserPayload = { ...payload, password: hashedPassword };
            //console.log(newUserPayload)
            const user = await this.userRepo.saveUser(newUserPayload);

            delete user.password;
    
            return user;
        } catch (error: any) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    

    public async getUserData(userId: string){
        try {
            const author = await this.userRepo.findUserById(userId);

            if(!author){
                throw new AppError(httpStatus.BAD_REQUEST, "invalid user")
            }

            const followers = await this.followersService.getFollowers(author.id)
            const following = await this.followersService.getFollowing(author.id)
            const posts = await this.postService.getUserPost(author.id)

     

            const response = {
                followers,
                following,
                posts,
                author
            }

            delete(response.author.password)

            return response
        } catch (error) {
            throw error
        }
    }

    // public async followUser(followerid: string, followingid: string){
    //     try {
    //         const exists = await this.userRepo.findUserById(followingid);

    //         if(!exists){
    //             throw new AppError(httpStatus.BAD_REQUEST, "invalid user")
    //         }

    //         await this.followUser

    //         return exists
    //     } catch (error) {
    //         throw error
    //     }
    //}

    public async findUserByUsername(username: string){
        try {
            const userNameExists = await this.userRepo.findUserByUsername(username);

            if(!userNameExists){
                throw new AppError(httpStatus.NOT_FOUND, "user not found")
            }

            delete userNameExists.password;

            return userNameExists
        } catch (error) {
            throw error
        }
    }

    public async updateProfuleImage(userId: string, base64String: string){
        try {
            const user = await this.userRepo.findUserById(userId);

            if(!user) throw new AppError(httpStatus.NOT_FOUND, "invalid user")

            const {secure_url} = await uploader(base64String, `profile-image/${user.user_name}`)

            console.log(secure_url)

             const data = await this.userRepo.updateUser(user.id, {imageUrl: secure_url});

             return data
        } catch (error) {
            return error
        }
    }

}