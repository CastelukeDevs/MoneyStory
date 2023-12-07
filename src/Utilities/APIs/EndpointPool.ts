import {IEndpointPool} from './APIUtils';

/**
 * This endpoint pool types accepts
 * @type IEndpointPool
 */
const EndpointPool = [
  {
    endpoint: 'GET_USER',
    url: '/auth/v1/test',
    method: 'get',
    auth: true,
  },
] as const;

export default EndpointPool;
