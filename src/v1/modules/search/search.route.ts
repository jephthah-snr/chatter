
import { FastifyPluginAsync } from 'fastify';
import { container } from 'tsyringe';
import { Methods } from '@shared/enum/methods.enum';
import SearchController from './search.controller';

const cartController = container.resolve(SearchController);

const searchRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: Methods.GET,
    url: '/posts',
    handler: cartController.search,
  });

  fastify.route({
    method: Methods.GET,
    url: '/users',
    handler: cartController.searchDriver,
  });
}

export default searchRoute
