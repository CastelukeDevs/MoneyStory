import {IEndpointPool} from './APIUtils';

// import {IEndpointMethod} from './APIUtils';

/**
 * This endpoint pool types accepts
 * @type IEndpointPool
 */

const EndpointPool = [
  {
    endpoint: 'GET_USER',
    url: '/auth/v1/user',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'CREATE_USER',
    url: '/auth/v1/user',
    method: 'post',
    auth: true,
  },
  {
    endpoint: 'UPDATE_USER',
    url: '/auth/v1/user',
    method: 'put',
    auth: true,
  },
] as const satisfies readonly IEndpointPool[];

export default EndpointPool;
