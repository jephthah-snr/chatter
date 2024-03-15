import AppError from '@shared/utils/error.utils';
import PostModel from '@v1/database/models/post.model';
import UserModel from '@v1/database/models/user.model';
import httpStatus from 'http-status';




class SearchService {
  async SearchPosts(query: string) {
      console.log(query)
    if (!query) {
      throw new Error('Please provide a query to search for.');
    }

    try {
      const [posts, users] = await Promise.all([
        PostModel.query().where(builder =>  {builder.where('title', 'ilike', `%${query}%`)
        .orWhere('content', 'ilike', `%${query}%`)
        .orWhere('tags', 'ilike', `%${query}%`)
        .orWhere('category', 'ilike', `%${query}%`)
      }),
        UserModel.query().where(builder => {
            builder.where('user_name', 'ilike', `%${query}%`)
                   .orWhere('last_name', 'ilike', `%${query}%`)
                   .orWhere('first_name', 'ilike', `%${query}%`);
        })
    ]);
    
      
      return { posts, users };
    } catch (error) {
      console.error('Error performing product search:', error);
      throw new AppError(httpStatus.NOT_FOUND, `Search for post "${query}" was not found.`);
    }
  }

  async SearchUsers(query: string) {
    console.log(query)
  if (!query) {
    throw new Error('Please provide a query to search for.');
  }

  try {
    const drivers = await UserModel.query()
    .where(builder => {
      builder.where('first_name', 'ilike', `%${query}%`)
             .orWhere('last_name', 'ilike', `%${query}%`)
             .orWhere('user_name', 'ilike', `%${query}%`);
    });
  

    if (!drivers.length) {
      throw new AppError(httpStatus.NOT_FOUND, `Search for user "${query}" was not found.`);
    }

    return drivers;
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, `Search for user "${query}" was not found.`);
  }
}
}

export default SearchService;


