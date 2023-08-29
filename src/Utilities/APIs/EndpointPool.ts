import {IEndpointPool} from './APIUtils';

/**
 * This endpoint pool types accepts
 * @type IEndpointPool
 */
const EndpointPool = [
  {
    endpoint: 'GET_USER',
    url: '/user',
    method: 'get',
  },
] as const;

export default EndpointPool;
