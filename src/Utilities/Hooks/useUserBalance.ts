import {selectWallets} from '@Redux/Reducers/WalletReducer';
import {useSelector} from 'react-redux';

export default () => {
  const wallet = useSelector(selectWallets);

  const total = wallet.reduce((a, {balance}) => a + (balance as number), 0);
  return total;
};
