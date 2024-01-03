import auth from '@react-native-firebase/auth';
import axios, {AxiosError} from 'axios';
import {IAPIError, IAPIsCallOption, IEndpoint, getEndpoint} from './APIUtils';
import {APP_API_KEY, BASE_SERVICES_PORT, BASE_URL} from '@env';
import transformObject from '@Utilities/transformObject';

const URL = BASE_URL + BASE_SERVICES_PORT + '/' + APP_API_KEY;

const APICall = async (endpoint: IEndpoint, options?: IAPIsCallOption) => {
  axios.defaults.baseURL = URL;

  const token = await auth().currentUser?.getIdToken();

  const selectEndpoint = getEndpoint(endpoint)!;

  const requestHeader = selectEndpoint.auth
    ? {Authorization: `Bearer ${token}`}
    : {};

  const payloadData = transformObject(options?.data);
  console.log(`=> New API Call ${endpoint} with detail:`, {
    options,
    payloadData,
  });

  return await axios({
    method: selectEndpoint.method,
    url: selectEndpoint.url,
    data: payloadData,
    params: options?.params,
    signal: options?.abortController?.signal,
    headers: {...requestHeader, 'Content-Type': 'multipart/form-data'},
  })
    .then(result => {
      console.log(`=> [O] axios request ${endpoint} success`, result);

      return result.data;
    })
    .catch((error: AxiosError<IAPIError>) => {
      const errorPayload = {
        message: error.response?.data?.message || error.message,
        code: `${error.response?.status}`,
        response: error.response,
      };
      console.log(
        `=> [X] axios request ${endpoint} error with code: ${errorPayload.code} //message: ${errorPayload.message}`,
      );
      console.error('=> [X] axios error:', error);

      throw errorPayload;
    });
};

export default APICall;
