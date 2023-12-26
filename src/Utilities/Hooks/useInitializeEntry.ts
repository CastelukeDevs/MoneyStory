import {it} from '@jest/globals';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';
import {IUserStateType} from '@Redux/Reducers/UserReducer';
import {getUserData} from '@Redux/Actions/UserAction';
import {getUserAccount} from '@Redux/Actions/AccountAction';
import {getUserWallets} from '@Redux/Actions/WalletAction';
import {AsyncThunkAction} from '@reduxjs/toolkit';
import {ICancelSignal} from '@Utilities/APIs/APIUtils';
import {AsyncThunkConfig} from '@reduxjs/toolkit/dist/createAsyncThunk';

// type IUseInitializeEntryProps = {
//   action: any;
//   message: string;
// };

const initializationList = [
  {action: getUserData(), name: 'user_data'},
  {action: getUserAccount(), name: 'user_account'},
  {action: getUserWallets(), name: 'user_wallets'},
] as const;

export type IInitListName = (typeof initializationList)[number]['name'];

const useInitializeEntry = () => {
  const dispatch = useDispatch<any>();

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [processName, setProcessName] = useState('');
  const [errorList, setErrorList] = useState<IInitListName[]>([]);

  useEffect(() => {
    setProgress(0);
    setError('');
    setProcessName('');
    getAllUserData();
    // if (initializing) {
    //   setInitializing(false);
    // }
    return () => {};
  }, []);

  const getAllUserData = async () => {
    for await (const initItem of initializationList) {
      console.log('action name:', initItem.name);
      setProcessName(initItem.name);
      await dispatch(initItem.action)
        .unwrap()
        .then((res: any) => {
          setProgress(p => p + 1);
        })
        .catch((err: any) => {
          console.log('err', err);

          setError(err.message);
          setErrorList(prev => [...prev, initItem.name]);
        });
    }
  };

  //   return [progress, processName, errorList as IInitListName[], error];
  return {
    total: initializationList.length,
    progress,
    processName,
    errorList,
    error,
  };
};

export default useInitializeEntry;
