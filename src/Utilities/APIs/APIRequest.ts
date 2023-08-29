import axios, {AxiosError} from 'axios';
import {IAPIsCallOption, IEndpoint, getEndpoint} from './APIUtils';
import {BASE_URL} from '@env';

const BaseURL = BASE_URL;

const APICall = async (endpoint: IEndpoint, options?: IAPIsCallOption) => {
  axios.defaults.baseURL = BaseURL;

  console.log('new Api call with detail:', {
    endpoint,
    options: options,
  });

  const selectEndpoint = getEndpoint(endpoint)!;

  return await axios({
    method: selectEndpoint.method,
    url: selectEndpoint.url,
    data: options?.payload,
    params: options?.params,
    cancelToken: options?.cancelToken,
  })
    .then(result => {
      return result.data;
    })
    .catch((error: AxiosError) => {
      console.error('axios error on request', error.config?.url);
      console.error('axios error', error);
      return error;
    });
};

export default APICall;
