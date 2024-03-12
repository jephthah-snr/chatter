import { CategoryRepository } from "@v1/repositories/categories.repositories"
import { injectable } from "tsyringe"


@injectable()
export default class categoryService{
    constructor(
        private readonly category: CategoryRepository
    ){}

    public async getAllCategories(){
        try {
            return await this.category.findAll()
        } catch (error) {
            throw error
        }
    }

    public async addCategory(payload: any){
        try {
            return await this.category.save(payload)
        } catch (error) {
            throw error
        }
    }

    public async getCategory(id: string){
        try {
            return await this.category.findById(id)
        } catch (error) {
            throw error
        }
    }
}