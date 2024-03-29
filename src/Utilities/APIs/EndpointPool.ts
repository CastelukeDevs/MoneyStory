import {IEndpointPool} from './APIUtils';

/**
 * This endpoint pool types accepts
 * @type IEndpointPool
 */

const authSubUrl: string = '/auth/v1';

const EndpointPool = [
  {
    endpoint: 'GET_USER',
    url: authSubUrl + '/user',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'CREATE_USER',
    url: authSubUrl + '/user',
    method: 'post',
    auth: true,
  },
  {
    endpoint: 'UPDATE_USER',
    url: authSubUrl + '/user',
    method: 'put',
    auth: true,
  },
  {
    endpoint: 'GET_ACCOUNT',
    url: authSubUrl + '/user/account',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'REFRESH_ACCOUNT',
    url: authSubUrl + '/user/account/refresh',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'GET_WALLET',
    url: authSubUrl + '/wallet',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'CREATE_WALLET',
    url: authSubUrl + '/wallet',
    method: 'post',
    auth: true,
  },
  {
    endpoint: 'UPDATE_WALLET',
    url: authSubUrl + '/wallet',
    method: 'put',
    auth: true,
  },
  {
    endpoint: 'DELETE_WALLET',
    url: authSubUrl + '/wallet',
    method: 'delete',
    auth: true,
  },
  {
    endpoint: 'CREATE_TRANSACTION',
    url: authSubUrl + '/transaction',
    method: 'post',
    auth: true,
  },
  {
    endpoint: 'GET_TRANSACTION',
    url: authSubUrl + '/transaction',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'UPDATE_TRANSACTION',
    url: authSubUrl + '/transaction',
    method: 'put',
    auth: true,
  },
  {
    endpoint: 'DELETE_TRANSACTION',
    url: authSubUrl + '/transaction',
    method: 'delete',
    auth: true,
  },
] as const satisfies IEndpointPool[];

export default EndpointPool;
