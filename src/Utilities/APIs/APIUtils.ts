import {CancelToken, GenericAbortSignal} from 'axios';
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
  auth?: boolean;
};

export type IEndpoint = (typeof EndpointPool)[number]['endpoint'];

export const getEndpoint = (endpoint: IEndpoint) => {
  return EndpointPool.find(item => item.endpoint === endpoint);
};

export type ICancelSignal = {
  abortController?: AbortController;
};

export type IAPIsCallOption = {
  params?: any;
  payload?: any;
  auth?: boolean;
} & ICancelSignal;

export const ActionPrefix: IEndpoint[] = EndpointPool.map(
  endpointItem => endpointItem.endpoint,
);
