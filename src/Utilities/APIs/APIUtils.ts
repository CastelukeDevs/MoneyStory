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
  data?: any;
  auth?: boolean;
} & ICancelSignal;

export const ActionPrefix: IEndpoint[] = EndpointPool.map(
  endpointItem => endpointItem.endpoint,
);

export type IAPIError = {message: string; status: number; error: any};

export const TransformObjectToForm = (object: any): FormData => {
  if (object === null || object === undefined) return object;
  const formData = new FormData();
  Object.keys(object).forEach(key => {
    const value = object[key];
    if (Array.isArray(value)) {
      value.forEach(v => {
        formData.append(`${key}[]`, JSON.stringify(v));
      });
    } else {
      formData.append(key, object[key]);
    }
  });
  return formData;
};
