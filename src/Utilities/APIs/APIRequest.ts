import auth from '@react-native-firebase/auth';
import axios, {AxiosError} from 'axios';
import {IAPIsCallOption, IEndpoint, getEndpoint} from './APIUtils';
import {APP_API_KEY, BASE_SERVICES_PORT, BASE_URL} from '@env';

const URL = BASE_URL + BASE_SERVICES_PORT + '/' + APP_API_KEY;

const APICall = async (endpoint: IEndpoint, options?: IAPIsCallOption) => {
  axios.defaults.baseURL = URL;

  const token = await auth().currentUser?.getIdToken();

  const selectEndpoint = getEndpoint(endpoint)!;

  console.log('new Api call with detail:', {
    endpoint,
    options: options,
    endpointDetails: selectEndpoint,
  });

  const requestHeader = selectEndpoint.auth
    ? {Authorization: `Bearer ${token}`}
    : {};

  return await axios({
    method: selectEndpoint.method,
    url: selectEndpoint.url,
    data: options?.payload,
    params: options?.params,
    cancelToken: options?.cancelToken,
    headers: {...requestHeader},
  })
    .then(result => {
      console.log('axios request success', result);

      return result.data;
    })
    .catch((error: AxiosError) => {
      console.error('axios error on request', error.config?.url);
      console.error('axios error', error);
      return error;
    });
};

export default APICall;
