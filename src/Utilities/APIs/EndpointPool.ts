import {IEndpointPool} from './APIUtils';

/**
 * This endpoint pool types accepts
 * @type IEndpointPool
 */

const authSubUrl: string = '/auth/v1';

const EndpointPool = [
  {
    endpoint: 'GET_USER',
    url: '/user',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'CREATE_USER',
    url: '/user',
    method: 'post',
    auth: true,
  },
  {
    endpoint: 'UPDATE_USER',
    url: '/user',
    method: 'put',
    auth: true,
  },
  {
    endpoint: 'GET_ACCOUNT',
    url: '/user/account',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'REFRESH_ACCOUNT',
    url: '/user/account/refresh',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'GET_WALLET',
    url: '/wallet',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'CREATE_WALLET',
    url: '/wallet',
    method: 'post',
    auth: true,
  },
  {
    endpoint: 'UPDATE_WALLET',
    url: '/wallet',
    method: 'put',
    auth: true,
  },
  {
    endpoint: 'DELETE_WALLET',
    url: '/wallet',
    method: 'delete',
    auth: true,
  },
  {
    endpoint: 'CREATE_TRANSACTION',
    url: '/transaction',
    method: 'post',
    auth: true,
  },
  {
    endpoint: 'GET_TRANSACTION',
    url: '/transaction',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'UPDATE_TRANSACTION',
    url: '/transaction',
    method: 'put',
    auth: true,
  },
  {
    endpoint: 'DELETE_TRANSACTION',
    url: '/transaction',
    method: 'delete',
    auth: true,
  },
] as const satisfies IEndpointPool[];

export default EndpointPool;
