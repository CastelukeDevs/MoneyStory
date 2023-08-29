import {CancelToken} from 'axios';
import EndpointPool from './EndpointPool';

enum EndpointMethod {
  get,
  post,
  delete,
  put,
}

export type IEndpointMethod = keyof typeof EndpointMethod;

export type IEndpointPool = {
  endpoint: string;
  url: string;
  method: IEndpointMethod;
  payload?: any;
  params?: any;
  auth?: boolean;
};

export type IEndpoint = (typeof EndpointPool)[number]['endpoint'];

export const getEndpoint = (endpoint: IEndpoint) => {
  return EndpointPool.find(item => item.endpoint === endpoint);
};

export type IAPIsCallOption = {
  params?: any;
  payload?: any;
  auth?: boolean;
  cancelToken?: CancelToken;
};

export const ActionPrefix: IEndpoint[] = EndpointPool.map(
  endpointItem => endpointItem.endpoint,
);
