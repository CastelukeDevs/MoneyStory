import axios, {AxiosError} from 'axios';
import GlobalValue from '../GlobalValue';
import {Endpoint, getEndpoint} from './APIUtils';

const APICall = async (endpoint: Endpoint, params?: any, payload?: any) => {
  axios.defaults.baseURL = GlobalValue.BaseURL;

  console.log('new Api call with detail:', {endpoint, params, payload});

  const selectEndpoint = getEndpoint(endpoint)!;

  return await axios({
    method: selectEndpoint.method,
    url:
      params === undefined
        ? selectEndpoint.url
        : `${selectEndpoint.url}${params.id}`,
    data: payload,
    // params: params,
  })
    .then(result => {
      return result.data;
    })
    .catch((error: AxiosError) => {
      console.error('axios error', error);
      return error;
    });
};

export default APICall;
