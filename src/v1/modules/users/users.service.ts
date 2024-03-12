import AppError from "@shared/utils/error.utils";
import { UserRepository } from "@v1/repositories/user.repository";
import httpStatus from "http-status";
import { injectable } from "tsyringe";
import PasswordHelper from "@v1/helpers/password.helper";
import { signToken } from "@shared/utils/jwt.util";

@injectable()
export default class UserService{
    constructor(
        private readonly userRepo: UserRepository,
        private readonly passwordHelper: PasswordHelper
    ){};

    public async findAll(): Promise<any[]>{
     const users =  await this.userRepo.findUsers()

     if(!users || users.length === 0){
        return []
     }

     return users
    }

    public async userLogin(payload: {email: string, password: string}): Promise<string>{
        try {
            console.log(payload)
            const user = await this.userRepo.findUserByEmail(payload.email)

            if(!user) throw new AppError(httpStatus.UNAUTHORIZED, "invalid login details");

            const isPassword = await this.passwordHelper.compare(payload.password, String(user.password))

            if(!isPassword) throw new AppError(httpStatus.UNAUTHORIZED, "Invalid login details");

            const token = await signToken({id: user.id})

            return token
        } catch (error: any) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
        }
    }


    public async register(payload: any){
        try {
            const exists = await this.userRepo.findUserByEmail(payload.email);
    
            if(exists) {
                throw new AppError(httpStatus.CONFLICT, "Email already used, try another");
            }
    
            const hashedPassword = await this.passwordHelper.hashPassword(payload.password);
    
            const newUserPayload = { ...payload, password: hashedPassword };
    
            const user = await this.userRepo.saveUser(newUserPayload);

            delete user.password;
    
            return user;
        } catch (error: any) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    

}