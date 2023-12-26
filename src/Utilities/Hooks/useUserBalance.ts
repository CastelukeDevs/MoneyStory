import {IRootStateType} from '@Redux/Store';
import {useSelector} from 'react-redux';

export default () => {
  const wallet = useSelector((state: IRootStateType) => state.wallet).wallets;

  const total = wallet.reduce((a, {balance}) => a + (balance as number), 0);
  return total;
};
