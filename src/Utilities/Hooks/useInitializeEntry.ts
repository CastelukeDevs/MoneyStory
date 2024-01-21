import {useDispatch} from 'react-redux';
import {getUserAccount} from '@Redux/Reducers/AccountReducer';
import {getUserData} from '@Redux/Reducers/UserReducer';
import {getUserWallets} from '@Redux/Reducers/WalletReducer';
import {useEffect, useState} from 'react';

type IInitializationList = {
  action: any;
  name: string;
};

const initializationList = [
  {action: getUserData(), name: 'user_data'},
  {action: getUserAccount(), name: 'user_account'},
  {action: getUserWallets(), name: 'user_wallets'},
] as const satisfies IInitializationList[];

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
